package com.chatapp.repository;

import com.chatapp.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

    List<ChatMessage> findBySenderIdAndReceiverIdOrSenderIdAndReceiverId(
        String senderId1, String receiverId1,
        String senderId2, String receiverId2
    );

    Optional<ChatMessage> findTopBySenderIdOrderByTimestampDesc(String senderId);
}
