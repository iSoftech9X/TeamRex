package com.chatapp.model;

public class WebRTCSignal {
    private String senderId;
    private String receiverId;   // for 1-to-1 calls
    private String type;         // "offer", "answer", "candidate"

    private String sdp;
    private String candidate;

    // NEW FIELDS
    private String contextType;  // "direct", "group", "meeting"
    private String contextId;    // chatId, channelId, or meetingId

    public WebRTCSignal() {}

	public String getSenderId() {
		return senderId;
	}

	public void setSenderId(String senderId) {
		this.senderId = senderId;
	}

	public String getReceiverId() {
		return receiverId;
	}

	public void setReceiverId(String receiverId) {
		this.receiverId = receiverId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getSdp() {
		return sdp;
	}

	public void setSdp(String sdp) {
		this.sdp = sdp;
	}

	public String getCandidate() {
		return candidate;
	}

	public void setCandidate(String candidate) {
		this.candidate = candidate;
	}

	public String getContextType() {
		return contextType;
	}

	public void setContextType(String contextType) {
		this.contextType = contextType;
	}

	public String getContextId() {
		return contextId;
	}

	public void setContextId(String contextId) {
		this.contextId = contextId;
	}

  
}
