package com.chatapp.service;

import com.chatapp.exception.ServiceException;
import com.chatapp.model.Channel;
import com.chatapp.repository.ChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ChannelService {

    private static final Logger logger = LoggerFactory.getLogger(ChannelService.class);

    @Autowired
    private ChannelRepository channelRepository;
  
    @Transactional
    public Channel createChannel(Channel channel) {
    try {
        // Check if a channel with the same name already exists in the same team
        List<Channel> existingChannels = channelRepository.findByTeamId(channel.getTeamId());
        boolean nameExists = existingChannels.stream()
            .anyMatch(c -> c.getName().equalsIgnoreCase(channel.getName()));

        if (nameExists) {
            throw new ServiceException("A channel with the name '" + channel.getName() + "' already exists in the team.");
        }

        return channelRepository.save(channel);
    } catch (ServiceException se) {
        throw se; 
    } catch (Exception e) {
        logger.error("Failed to create channel: {}", e.getMessage(), e);
        throw new ServiceException("Unable to create channel. Please try again later.", e);
    }
}


    public List<Channel> getChannelsByTeamId(String teamId) {
        try {
            return channelRepository.findByTeamId(teamId);
        } catch (Exception e) {
            logger.error("Failed to fetch channels for team ID {}: {}", teamId, e.getMessage(), e);
            throw new ServiceException("Unable to fetch channels. Please try again later.", e);
        }
    }

    public Optional<Channel> getChannelById(String id) {
        try {
            return channelRepository.findById(id);
        } catch (Exception e) {
            logger.error("Failed to fetch channel by ID {}: {}", id, e.getMessage(), e);
            throw new ServiceException("Unable to fetch channel. Please try again later.", e);
        }
    }
}
