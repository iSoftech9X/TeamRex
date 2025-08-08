package com.chatapp.model;

public class WebRTCSignal {
    private String senderId;
    private String receiverId;
    private String type;       // "offer", "answer", or "candidate"
    private String sdp;         // optional: used for offer/answer
    private String candidate;
    
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
	


}
