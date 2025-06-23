package com.chatapp.service;

import com.chatapp.model.Team;
import com.chatapp.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    public Team createTeam(Team team) {
        return teamRepository.save(team);
    }

    public List<Team> getTeamsByEntityId(String entityId) {
        return teamRepository.findByEntityId(entityId);
    }

    public Optional<Team> getTeamById(String id) {
        return teamRepository.findById(id);
    }
}
