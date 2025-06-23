package com.chatapp.controller;

import com.chatapp.dto.TypingStatus;
import com.chatapp.model.ChannelMessage;
import com.chatapp.service.ChannelMessageService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChannelChatWebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChannelMessageService channelMessageService;

    @MessageMapping("/channel/{channelId}/send")
    public void sendChannelMessage(@DestinationVariable String channelId,
                                   ChannelMessage message) {
        // Save to DB
        ChannelMessage saved = channelMessageService.sendMessage(message);
        // Broadcast to subscribers
        messagingTemplate.convertAndSend("/topic/channel/" + channelId, saved);
    }
    @MessageMapping("/channel/{channelId}/delivered")
    public void markDelivered(@DestinationVariable String channelId, Map<String, String> data) {
        channelMessageService.markAsDelivered(data.get("messageId"), data.get("userId"));
    }

    @MessageMapping("/channel/{channelId}/seen")
    public void markSeen(@DestinationVariable String channelId, Map<String, String> data) {
        channelMessageService.markAsSeen(data.get("messageId"), data.get("userId"));
    }
    @MessageMapping("/channel/{channelId}/typing")
    @SendTo("/topic/channel/{channelId}/typing")
    public TypingStatus typing(@DestinationVariable String channelId, TypingStatus status) {
        return status;
    }
    @MessageMapping("/channel/{channelId}/edit")
    @SendTo("/topic/channel/{channelId}")
    public ChannelMessage edit(@DestinationVariable String channelId, Map<String, String> payload) {
        return channelMessageService.editMessage(payload.get("messageId"), payload.get("newContent"));
    }

    @MessageMapping("/channel/{channelId}/delete")
    @SendTo("/topic/channel/{channelId}")
    public ChannelMessage delete(@DestinationVariable String channelId, Map<String, String> payload) {
        String messageId = payload.get("messageId");
        channelMessageService.softDeleteMessage(messageId);

        return channelMessageService.getMessageById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found with id: " + messageId));
    }


}
