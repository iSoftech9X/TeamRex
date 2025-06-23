package com.chatapp.repository;

import com.chatapp.model.Channel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChannelRepository extends MongoRepository<Channel, String> {
    List<Channel> findByTeamId(String teamId);
}
