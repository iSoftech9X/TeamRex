package com.chatapp.service;

import com.chatapp.model.Channel;
import com.chatapp.repository.ChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChannelService {

    @Autowired
    private ChannelRepository channelRepository;

    public Channel createChannel(Channel channel) {
        return channelRepository.save(channel);
    }

    public List<Channel> getChannelsByTeamId(String teamId) {
        return channelRepository.findByTeamId(teamId);
    }

    public Optional<Channel> getChannelById(String id) {
        return channelRepository.findById(id);
    }
}
