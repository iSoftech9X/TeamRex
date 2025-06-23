package com.chatapp.controller;

import com.chatapp.model.Team;
import com.chatapp.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin("*")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @PostMapping
    public Team createTeam(@RequestBody Team team) {
        return teamService.createTeam(team);
    }

    @GetMapping("/workspace/{entityId}")
    public List<Team> getTeamsByEntityId(@PathVariable String entityId) {
        return teamService.getTeamsByEntityId(entityId);
    }

    @GetMapping("/{id}")
    public Optional<Team> getTeamById(@PathVariable String id) {
        return teamService.getTeamById(id);
    }
}
