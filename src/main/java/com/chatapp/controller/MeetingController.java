package com.chatapp.controller;

import com.chatapp.model.Meeting;
import com.chatapp.service.MeetingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/meetings")
@CrossOrigin("*")
public class MeetingController {

    private final MeetingService meetingService;

    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    // Create a new meeting
    @PostMapping("/create")
    public ResponseEntity<?> createMeeting(@RequestParam String userId) {
        Meeting meeting = meetingService.createMeeting(userId);

        String meetingLink = "https://yourapp.com/meet/" + meeting.getId();

        return ResponseEntity.ok(Map.of(
                "meetingId", meeting.getId(),
                "meetingLink", meetingLink
        ));
    }

    // Get meeting info
    @GetMapping("/{id}")
    public ResponseEntity<?> getMeeting(@PathVariable String id) {
        Meeting meeting = meetingService.getMeeting(id);
        if (meeting == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(meeting);
    }
}
