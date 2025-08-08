package com.chatapp.repository;

import com.chatapp.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

    List<ChatMessage> findBySenderIdAndReceiverId(String senderId, String receiverId);

    List<ChatMessage> findByReceiverIdAndSenderId(String receiverId, String senderId);

    
}
