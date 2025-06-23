package com.chatapp.controller;

import com.chatapp.model.Channel;
import com.chatapp.service.ChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/channels")
@CrossOrigin("*")
public class ChannelController {

    @Autowired
    private ChannelService channelService;

    @PostMapping
    public Channel createChannel(@RequestBody Channel channel) {
        return channelService.createChannel(channel);
    }

    @GetMapping("/team/{teamId}")
    public List<Channel> getChannelsByTeamId(@PathVariable String teamId) {
        return channelService.getChannelsByTeamId(teamId);
    }

    @GetMapping("/{id}")
    public Optional<Channel> getChannelById(@PathVariable String id) {
        return channelService.getChannelById(id);
    }
}
