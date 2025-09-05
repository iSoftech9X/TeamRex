 package com.chatapp.controller;

import com.chatapp.model.WebRTCSignal;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebRTCController {

    private final SimpMessagingTemplate messagingTemplate;

    public WebRTCController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

//    @MessageMapping("/webrtc/{receiverId}")
//    public void handleWebRTCSignaling(@DestinationVariable String receiverId, WebRTCSignal signal) {
//        System.out.println("WebRTC signal from " + signal.getSenderId() + " to " + receiverId + ": " + signal.getType());
//        // this hlps to Send the signal to the intended receiver
//        messagingTemplate.convertAndSend("/topic/webrtc/" + receiverId, signal);
//    }
    @MessageMapping("/webrtc/{contextType}/{contextId}")
    public void handleWebRTCSignaling(
            @DestinationVariable String contextType,
            @DestinationVariable String contextId,
            WebRTCSignal signal
    ) {
        System.out.println("WebRTC [" + contextType + "] signal for " + contextId + " from " 
            + signal.getSenderId() + " : " + signal.getType());

        switch (contextType) {
            case "direct": // individual call
                messagingTemplate.convertAndSend(
                    "/topic/webrtc/" + contextType + "/" + contextId + "/" + signal.getReceiverId(),
                    signal
                );
                break;

            case "group": // group call
                messagingTemplate.convertAndSend(
                    "/topic/webrtc/" + contextType + "/" + contextId,
                    signal
                );
                break;

            case "meeting": // meeting link
                messagingTemplate.convertAndSend(
                    "/topic/webrtc/" + contextType + "/" + contextId,
                    signal
                );
                break;

            default:
                System.out.println("Unknown context type: " + contextType);
        }
    }










}
