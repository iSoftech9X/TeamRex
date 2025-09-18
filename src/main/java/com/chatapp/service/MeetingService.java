package com.chatapp.service;

import com.chatapp.dto.ParticipantDTO;
import com.chatapp.model.Meeting;
import com.chatapp.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private UserService userService; // Service to fetch user info (id → name)

    public Meeting createMeeting(String userId) {
        Meeting meeting = new Meeting();
        meeting.setCreatedBy(userId);
        meeting.setActive(true);
        return meetingRepository.save(meeting);
    }

    public Meeting getMeeting(String id) {
        return meetingRepository.findById(id).orElse(null);
    }

    public Meeting saveMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    // Convert userIds to ParticipantDTOs (id + name)
    public List<ParticipantDTO> getParticipantsWithNames(List<String> userIds) {
        return userIds.stream()
                .map(id -> new ParticipantDTO(id, userService.getUsernameById(id)))
                .collect(Collectors.toList());
    }
}

