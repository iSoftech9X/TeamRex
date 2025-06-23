package com.chatapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Document(collection = "channel_messages")
public class ChannelMessage {

    @Id
    private String id;

    private String channelId;
    private String senderId;
    private String content;

    private LocalDateTime editedAt;

    public LocalDateTime getEditedAt() {
		return editedAt;
	}

	public void setEditedAt(LocalDateTime editedAt) {
		this.editedAt = editedAt;
	}

	private MessageStatus status = MessageStatus.SENT;

    private boolean edited = false;
    private boolean deleted = false;
    private String statusinfo = "SENT"; // SENT, DELIVERED, SEEN
    public String getStatusinfo() {
		return statusinfo;
	}

	public void setStatusinfo(String statusinfo) {
		this.statusinfo = statusinfo;
	}

	public Set<String> getDeliveredTo() {
		return deliveredTo;
	}

	public void setDeliveredTo(Set<String> deliveredTo) {
		this.deliveredTo = deliveredTo;
	}

	public Set<String> getSeenBy() {
		return seenBy;
	}

	public void setSeenBy(Set<String> seenBy) {
		this.seenBy = seenBy;
	}

	private Set<String> deliveredTo = new HashSet<>();
    private Set<String> seenBy = new HashSet<>();
    
    
    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getChannelId() {
        return channelId;
    }

    public void setChannelId(String channelId) {
        this.channelId = channelId;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public MessageStatus getStatus() {
        return status;
    }

    public void setStatus(MessageStatus status) {
        this.status = status;
    }

    public boolean isEdited() {
        return edited;
    }

    public void setEdited(boolean edited) {
        this.edited = edited;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
