package com.chatapp.service;

import com.chatapp.model.ChatMessage;
import com.chatapp.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    private static final Logger logger = LoggerFactory.getLogger(ChatService.class);

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public ChatMessage createMessage(ChatMessage message) {
        message.setTimestamp(LocalDateTime.now());
        return chatMessageRepository.save(message);
    }

    public List<ChatMessage> findMessagesBetweenUsers(String senderId, String receiverId) {
        List<ChatMessage> messages =
            chatMessageRepository.findBySenderIdAndReceiverIdOrSenderIdAndReceiverId(
                senderId, receiverId,
                receiverId, senderId 
            );

        // Sort by timestamp (oldest → newest)
        messages.sort(Comparator.comparing(ChatMessage::getTimestamp));

        return messages;
    }


    public Optional<ChatMessage> findMessageById(String id) {
        return chatMessageRepository.findById(id);
    }

    public ChatMessage saveOrUpdateMessage(ChatMessage updatedMessage) {
        return chatMessageRepository.save(updatedMessage);
    }

    public void softDeleteMessageById(String messageId) {
        chatMessageRepository.findById(messageId).ifPresent(message -> {
            if (!message.isDeleted()) {
                message.setDeleted(true);
                chatMessageRepository.save(message);
            } else {
                logger.info("Message {} already soft deleted", messageId);
            }
        });
    }

    public void markAsDelivered(String messageId, String userId) {
        chatMessageRepository.findById(messageId).ifPresentOrElse(message -> {
            if (!message.getDeliveredTo().contains(userId)) {
                message.getDeliveredTo().add(userId);
                message.setStatusinfo("DELIVERED");
                chatMessageRepository.save(message);
            } else {
                logger.info("User {} has already marked message {} as delivered", userId, messageId);
            }
        }, () -> logger.warn("Message not found for markAsDelivered: {}", messageId));
    }

    public void markAsSeen(String messageId, String userId) {
        chatMessageRepository.findById(messageId).ifPresentOrElse(message -> {
            if (!message.getSeenBy().contains(userId)) {
                message.getSeenBy().add(userId);
                message.setStatusinfo("SEEN");
                chatMessageRepository.save(message);
            } else {
                logger.info("User {} has already marked message {} as seen", userId, messageId);
            }
        }, () -> logger.warn("Message not found for markAsSeen: {}", messageId));
    }

    public ChatMessage editMessage(String messageId, String newContent, String senderId) {
        return chatMessageRepository.findById(messageId)
            .map(msg -> {
                if (msg.isDeleted()) {
                    throw new IllegalStateException("Cannot edit a deleted message.");
                }

                if (!msg.getSenderId().equals(senderId)) {
                    throw new IllegalStateException("You can only edit your own messages.");
                }

               
                Optional<ChatMessage> latestMsgOpt =
                    chatMessageRepository.findTopBySenderIdOrderByTimestampDesc(senderId);

                if (latestMsgOpt.isEmpty() || !latestMsgOpt.get().getId().equals(messageId)) {
                    throw new IllegalStateException("Only the latest message can be edited.");
                }

                LocalDateTime now = LocalDateTime.now();
                if (msg.getTimestamp() != null && msg.getTimestamp().plusMinutes(5).isBefore(now)) {
                    throw new IllegalStateException("You can only edit within 5 minutes of sending.");
                }

              
                msg.setContent(newContent);
                msg.setEdited(true);
                msg.setEditedAt(now);
                msg.setStatusinfo("EDITED");

                return chatMessageRepository.save(msg);
            })
            .orElseThrow(() -> new IllegalArgumentException("Message not found."));
    }



}
