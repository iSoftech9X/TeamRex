import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;
let peerConnections = {}; // Store multiple peer connections for group calls
let localStream = null;
let currentCallContext = {}; // To keep track of the receiver/group ID

const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

// Connects to the WebSocket endpoint for WebRTC signaling
export const connectWebRTCSocket = (userId, onSignal, onConnect, onError) => {
  if (stompClient && stompClient.active) {
    console.log("WebRTC STOMP client already connected.");
    return;
  }

  stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    connectHeaders: { userId },
    debug: (str) => console.log("WebRTC STOMP Debug:", str),
    reconnectDelay: 5000,
    onConnect: (frame) => {
      console.log("WebRTC STOMP connected:", frame);
      if (onConnect) onConnect();

      // Subscription for direct calls. The backend will route signals for a specific user here.
      stompClient.subscribe(`/topic/webrtc/direct/user/${userId}`, (message) => {
        const signal = JSON.parse(message.body);
        console.log("Received direct signal:", signal);
        onSignal(signal);
      });

      // Example for group call subscription (adjust topic as needed)
      // stompClient.subscribe(`/topic/webrtc/group/{groupId}`, ...);
    },
    onStompError: (frame) => {
      console.error("WebRTC Broker error:", frame.headers["message"]);
      if (onError) onError(frame);
    },
  });

  stompClient.activate();
};

// Disconnects the WebRTC signaling WebSocket
export const disconnectWebRTCSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
    console.log("WebRTC STOMP client disconnected.");
  }
};

// Sends a signal to another user/group via the WebSocket
export const sendWebRTCSignal = (signal) => {
  if (stompClient && stompClient.connected) {
    const { contextType, contextId, receiverId } = signal;
    let destination = `/app/webrtc/${contextType}/${contextId}`;

    // For direct calls, the backend needs the receiverId in the topic path to correctly route it.
    // The backend WebRTCController is designed to handle this.
    if (contextType === "direct") {
        destination = `/app/webrtc/direct/user/${receiverId}`;
    }
    
    stompClient.publish({
      destination: destination,
      body: JSON.stringify(signal),
    });
  } else {
    console.error("WebRTC STOMP client not connected. Cannot send signal.");
  }
};

// Creates and configures a new RTCPeerConnection
const createPeerConnection = (senderId, receiverId, onTrack) => {
    // Clean up any existing connection for this peer
    if (peerConnections[receiverId]) {
        peerConnections[receiverId].close();
    }

    const pc = new RTCPeerConnection(ICE_SERVERS);

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            sendWebRTCSignal({
                type: 'ice-candidate',
                candidate: event.candidate,
                senderId: senderId,
                receiverId: receiverId,
                contextType: 'direct', 
                contextId: 'user', // Context ID might be chat ID or group ID
            });
        }
    };

    pc.ontrack = onTrack;

    if (localStream) {
        localStream.getTracks().forEach(track => {
            pc.addTrack(track, localStream);
        });
    }
    
    peerConnections[receiverId] = pc;
    return pc;
};

// Starts the process of initiating a call
export const startCall = async (senderId, receiverId, onTrack) => {
    try {
        currentCallContext = { peerId: receiverId };
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const pc = createPeerConnection(senderId, receiverId, onTrack);
        
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        
        sendWebRTCSignal({
            type: 'offer',
            offer: offer,
            senderId: senderId,
            receiverId: receiverId,
            contextType: 'direct',
            contextId: 'user',
        });
        
        return { localStream };
    } catch (error) {
        console.error("Error starting call:", error);
        throw error;
    }
};

// Handles an incoming offer from a peer
export const handleOffer = async (signal, onTrack) => {
    try {
        const { senderId, receiverId, offer } = signal;
        currentCallContext = { peerId: senderId };
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const pc = createPeerConnection(receiverId, senderId, onTrack);

        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        
        sendWebRTCSignal({
            type: 'answer',
            answer: answer,
            senderId: receiverId,
            receiverId: senderId, 
            contextType: 'direct',
            contextId: 'user',
        });

        return { localStream };
    } catch (error) {
        console.error("Error handling offer:", error);
        throw error;
    }
};

// Handles an incoming answer from a peer
export const handleAnswer = async (signal) => {
    const { senderId, answer } = signal;
    const pc = peerConnections[senderId];
    if (pc) {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        console.log("Call established!");
    }
};

// Handles an incoming ICE candidate from a peer
export const handleIceCandidate = async (signal) => {
    const { senderId, candidate } = signal;
    // The candidate might be for a connection we are initiating or receiving from.
    const pc = peerConnections[senderId] || Object.values(peerConnections)[0];
    if (pc && candidate) {
        try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (error) {
            console.error("Error adding received ICE candidate:", error);
        }
    }
};

// Ends the call and cleans up resources
export const endCall = () => {
    const peerId = currentCallContext.peerId;
    if (peerId && peerConnections[peerId]) {
        peerConnections[peerId].close();
        delete peerConnections[peerId];
    }
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
    // Optionally send a 'hangup' signal to the other peer
    console.log("Call ended and resources cleaned up.");
    currentCallContext = {};
};