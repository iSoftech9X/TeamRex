package com.chatapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "meetings")
public class Meeting {
    @Id
    private String id;         // unique meetingId
    private String createdBy;  // userId of creator
    private Date createdAt;
    private boolean active;
}
