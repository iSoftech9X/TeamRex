package com.chatapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "chats")
public class ChatMessage {
    @Id
    private String id;
    private String senderId;
    private String receiverId;
    private String content;
    private LocalDateTime timestamp;
    private LocalDateTime editedAt;
    private boolean deleted = false;

    private List<String> deliveredTo;
    private List<String> seenBy;
    private String statusinfo; // SENT, DELIVERED, SEEN
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
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
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	public LocalDateTime getEditedAt() {
		return editedAt;
	}
	public void setEditedAt(LocalDateTime editedAt) {
		this.editedAt = editedAt;
	}
	public boolean isDeleted() {
		return deleted;
	}
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	public List<String> getDeliveredTo() {
		return deliveredTo;
	}
	public void setDeliveredTo(List<String> deliveredTo) {
		this.deliveredTo = deliveredTo;
	}
	public List<String> getSeenBy() {
		return seenBy;
	}
	public void setSeenBy(List<String> seenBy) {
		this.seenBy = seenBy;
	}
	public String getStatusinfo() {
		return statusinfo;
	}
	public void setStatusinfo(String statusinfo) {
		this.statusinfo = statusinfo;
	}

}
