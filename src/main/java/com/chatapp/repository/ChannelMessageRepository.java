package com.chatapp.repository;

import com.chatapp.model.ChannelMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChannelMessageRepository extends MongoRepository<ChannelMessage, String> {
    List<ChannelMessage> findByChannelId(String channelId);
}
