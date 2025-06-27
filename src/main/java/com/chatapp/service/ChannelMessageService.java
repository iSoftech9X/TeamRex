package com.chatapp.service;

import com.chatapp.model.ChannelMessage;
import com.chatapp.repository.ChannelMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChannelMessageService {

    @Autowired
    private ChannelMessageRepository channelMessageRepository;

    public ChannelMessage sendMessage(ChannelMessage message) {
    	message.setEditedAt(LocalDateTime.now());
        return channelMessageRepository.save(message);
    }


    public List<ChannelMessage> getMessagesByChannelId(String channelId) {
        return channelMessageRepository.findByChannelId(channelId);
    }

    public Optional<ChannelMessage> getMessageById(String id) {
        return channelMessageRepository.findById(id);
    }

    public ChannelMessage updateMessage(ChannelMessage updatedMessage) {
        return channelMessageRepository.save(updatedMessage);
    }

    public void deleteMessage(String id) {
        Optional<ChannelMessage> messageOpt = channelMessageRepository.findById(id);
        messageOpt.ifPresent(message -> {
            message.setDeleted(true);  // Soft delete
            channelMessageRepository.save(message);
        });
    }
    public void markAsDelivered(String messageId, String userId) {
        ChannelMessage message = channelMessageRepository.findById(messageId).orElse(null);
        if (message != null && !message.getDeliveredTo().contains(userId)) {
            message.getDeliveredTo().add(userId);
            if (message.getDeliveredTo().size() >= 1) {
                message.setStatusinfo("DELIVERED");
            }
            channelMessageRepository.save(message);
        }
    }
 
    public void markAsSeen(String messageId, String userId) {
        ChannelMessage message = channelMessageRepository.findById(messageId).orElse(null);
        if (message != null && !message.getSeenBy().contains(userId)) {
            message.getSeenBy().add(userId);
            if (message.getSeenBy().size() >= 1) {
                message.setStatusinfo("SEEN");
            }
            channelMessageRepository.save(message);
        }
    }
    public ChannelMessage editMessage(String messageId, String newContent) {
        ChannelMessage msg = channelMessageRepository.findById(messageId).orElse(null);
        if (msg != null && !msg.isDeleted()) {
            msg.setContent(newContent);
            msg.setEditedAt(LocalDateTime.now());
            channelMessageRepository.save(msg);
        }
        return msg;
    }

    public void softDeleteMessage(String messageId) {
        ChannelMessage msg = channelMessageRepository.findById(messageId).orElse(null);
        if (msg != null) {
            msg.setDeleted(true);
            channelMessageRepository.save(msg);
        }
    }
  
}
