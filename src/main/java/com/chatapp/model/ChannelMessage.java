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
    private MessageStatus status = MessageStatus.SENT;
	private Set<String> deliveredTo = new HashSet<>();
    private Set<String> seenBy = new HashSet<>();
    private boolean edited = false;
    private boolean deleted = false;
    private String statusinfo = "SENT"; // SENT, DELIVERED, SEEN
    private LocalDateTime editedAt;
    private boolean hasAttachment;
    private String attachmentUrl;
    private String attachmentName;
    private String attachmentType;
    private String senderName;
    private String senderAvatar;
    public String getSenderName() {
		return senderName;
	}

	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}

	public String getSenderAvatar() {
		return senderAvatar;
	}

	public void setSenderAvatar(String senderAvatar) {
		this.senderAvatar = senderAvatar;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	private String type; // e.g. "text"
    private LocalDateTime timestamp;

    public boolean isHasAttachment() {
		return hasAttachment;
	}

	public void setHasAttachment(boolean hasAttachment) {
		this.hasAttachment = hasAttachment;
	}

	public String getAttachmentUrl() {
		return attachmentUrl;
	}

	public void setAttachmentUrl(String attachmentUrl) {
		this.attachmentUrl = attachmentUrl;
	}

	public String getAttachmentName() {
		return attachmentName;
	}

	public void setAttachmentName(String attachmentName) {
		this.attachmentName = attachmentName;
	}

	public String getAttachmentType() {
		return attachmentType;
	}

	public void setAttachmentType(String attachmentType) {
		this.attachmentType = attachmentType;
	}

	public LocalDateTime getEditedAt() {
		return editedAt;
	}

	public void setEditedAt(LocalDateTime editedAt) {
		this.editedAt = editedAt;
	}

	
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
