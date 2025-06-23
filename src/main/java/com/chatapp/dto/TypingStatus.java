package com.chatapp.dto;

public class TypingStatus {
    private String channelId;
    private String userId;
    private boolean typing;
	public String getChannelId() {
		return channelId;
	}
	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public boolean isTyping() {
		return typing;
	}
	public void setTyping(boolean typing) {
		this.typing = typing;
	}

}

