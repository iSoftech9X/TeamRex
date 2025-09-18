package com.chatapp.dto;

import java.util.List;

public class ParticipantUpdateDTO {
    private String type; // "join" or "leave"
    private ParticipantDTO participant; // user joining/leaving
    private List<ParticipantDTO> participants; // current participants

    public ParticipantUpdateDTO() {}

    public ParticipantUpdateDTO(String type, ParticipantDTO participant, List<ParticipantDTO> participants) {
        this.type = type;
        this.participant = participant;
        this.participants = participants;
    }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public ParticipantDTO getParticipant() { return participant; }
    public void setParticipant(ParticipantDTO participant) { this.participant = participant; }

    public List<ParticipantDTO> getParticipants() { return participants; }
    public void setParticipants(List<ParticipantDTO> participants) { this.participants = participants; }
}
