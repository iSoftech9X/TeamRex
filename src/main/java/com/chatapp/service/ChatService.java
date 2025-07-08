package com.chatapp.service;

import com.chatapp.model.ChatMessage;
import com.chatapp.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository; 

    public ChatMessage sendMessage(ChatMessage message) {
        message.setTimestamp(LocalDateTime.now());
        return chatMessageRepository.save(message);
    }

    public List<ChatMessage> getMessagesBetweenUsers(String senderId, String receiverId) {
        return chatMessageRepository.findBySenderIdAndReceiverId(senderId, receiverId);
    }

    public Optional<ChatMessage> getMessageById(String id) {
        return chatMessageRepository.findById(id);
    }

    public ChatMessage updateMessage(ChatMessage updatedMessage) {
        return chatMessageRepository.save(updatedMessage);
    }

    public void deleteMessage(String id) {
        Optional<ChatMessage> messageOpt = chatMessageRepository.findById(id);
        messageOpt.ifPresent(message -> {
            message.setDeleted(true); // Soft delete
            chatMessageRepository.save(message);
        });
    }

    public void markAsDelivered(String messageId, String userId) {
        ChatMessage message = chatMessageRepository.findById(messageId).orElse(null);
        if (message != null && !message.getDeliveredTo().contains(userId)) {
            message.getDeliveredTo().add(userId);
            message.setStatusinfo("DELIVERED");
            chatMessageRepository.save(message);
        }
    }

    public void markAsSeen(String messageId, String userId) {
        ChatMessage message = chatMessageRepository.findById(messageId).orElse(null);
        if (message != null && !message.getSeenBy().contains(userId)) {
            message.getSeenBy().add(userId);
            message.setStatusinfo("SEEN");
            chatMessageRepository.save(message);
        }
    }

    public ChatMessage editMessage(String messageId, String newContent) {
        ChatMessage msg = chatMessageRepository.findById(messageId).orElse(null);
        if (msg != null && !msg.isDeleted()) {
            msg.setContent(newContent);
            msg.setEditedAt(LocalDateTime.now());
            chatMessageRepository.save(msg);
        }
        return msg;
    }

    public void softDeleteMessage(String messageId) {
        ChatMessage msg = chatMessageRepository.findById(messageId).orElse(null);
        if (msg != null) {
            msg.setDeleted(true);
            chatMessageRepository.save(msg);
        }
    }
}
