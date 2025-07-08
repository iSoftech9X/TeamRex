package com.chatapp.repository;

import com.chatapp.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

    List<ChatMessage> findBySenderIdAndReceiverId(String senderId, String receiverId);

    List<ChatMessage> findByReceiverIdAndSenderId(String receiverId, String senderId);

    // Optional: Bi-directional
    default List<ChatMessage> getAllMessagesBetweenUsers(String userId1, String userId2) {
        List<ChatMessage> messages1 = findBySenderIdAndReceiverId(userId1, userId2);
        List<ChatMessage> messages2 = findBySenderIdAndReceiverId(userId2, userId1);
        messages1.addAll(messages2);
        return messages1;
    }
}
