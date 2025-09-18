package com.chatapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "meetings")
public class Meeting {
    @Id
    private String id;
    private String createdBy;
    private Date createdAt = new Date();
    private boolean active = true;

    // Track current participants
    private List<String> participants = new ArrayList<>();
}
