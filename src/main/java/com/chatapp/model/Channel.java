package com.chatapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "channels")
public class Channel {
    @Id
    private String id;
    private String name;
    private String teamId; // Reference to the parent team
    private String type; // text, voice, video
    private List<String> memberIds; // Who can access the channel
    private Date createdAt;

    public Channel() {
        this.createdAt = new Date();
    }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTeamId() {
		return teamId;
	}

	public void setTeamId(String teamId) {
		this.teamId = teamId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<String> getMemberIds() {
		return memberIds;
	}

	public void setMemberIds(List<String> memberIds) {
		this.memberIds = memberIds;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

}
