package com.chatapp.service;

import com.chatapp.model.Meeting;
import com.chatapp.repository.MeetingRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;

    public MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    // Create a new meeting 
    public Meeting createMeeting(String userId) {
        Meeting meeting = new Meeting();
        meeting.setCreatedBy(userId);
        meeting.setCreatedAt(new Date());
        meeting.setActive(true);
        return meetingRepository.save(meeting);
    }

    // Fetch a meeting by ID
    public Meeting getMeeting(String meetingId) {
        return meetingRepository.findById(meetingId).orElse(null);
    }

    // deactivate a meeting
    public void deactivateMeeting(String meetingId) {
        Meeting meeting = getMeeting(meetingId);
        if (meeting != null) {
            meeting.setActive(false);
            meetingRepository.save(meeting);
        }
    }
}
