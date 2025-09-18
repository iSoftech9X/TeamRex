package com.chatapp.controller;

import com.chatapp.dto.ParticipantDTO;
import com.chatapp.dto.ParticipantUpdateDTO;
import com.chatapp.model.WebRTCSignal;
import com.chatapp.model.Meeting;
import com.chatapp.service.MeetingService;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class WebRTCController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MeetingService meetingService;

    public WebRTCController(SimpMessagingTemplate messagingTemplate, MeetingService meetingService) {
        this.messagingTemplate = messagingTemplate;
        this.meetingService = meetingService;
    }

    // ===== Join meeting =====
    @MessageMapping("/meeting/{meetingId}/join")
    public void joinMeeting(@DestinationVariable String meetingId, WebRTCSignal signal) {
        Meeting meeting = meetingService.getMeeting(meetingId);
        if (meeting == null) return;

        if (!meeting.getParticipants().contains(signal.getSenderId())) {
            meeting.getParticipants().add(signal.getSenderId());
            meetingService.saveMeeting(meeting);
        }

        List<ParticipantDTO> participantsWithNames = meetingService.getParticipantsWithNames(meeting.getParticipants());
        ParticipantDTO joiningParticipant = meetingService.getParticipantsWithNames(
                List.of(signal.getSenderId())
        ).get(0);

        messagingTemplate.convertAndSend(
                "/topic/webrtc/meeting/" + meetingId,
                new ParticipantUpdateDTO("join", joiningParticipant, participantsWithNames)
        );
    }

    // ===== Leave meeting =====
    @MessageMapping("/meeting/{meetingId}/leave")
    public void leaveMeeting(@DestinationVariable String meetingId, WebRTCSignal signal) {
        Meeting meeting = meetingService.getMeeting(meetingId);
        if (meeting == null) return;

        meeting.getParticipants().remove(signal.getSenderId());
        meetingService.saveMeeting(meeting);

        List<ParticipantDTO> participantsWithNames = meetingService.getParticipantsWithNames(meeting.getParticipants());
        ParticipantDTO leavingParticipant = meetingService.getParticipantsWithNames(
                List.of(signal.getSenderId())
        ).get(0);

        messagingTemplate.convertAndSend(
                "/topic/webrtc/meeting/" + meetingId,
                new ParticipantUpdateDTO("leave", leavingParticipant, participantsWithNames)
        );
    }
}
