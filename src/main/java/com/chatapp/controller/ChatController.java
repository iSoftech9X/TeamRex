package com.chatapp.controller;

import com.chatapp.model.ChatMessage;
import com.chatapp.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {
 
    @Autowired
    private ChatService chatService;

    // ========================= REST Endpoints =========================

    @PostMapping("/send")
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        return chatService.sendMessage(message);
    }

    @GetMapping("/messages")
    public List<ChatMessage> getMessages(@RequestParam String senderId, @RequestParam String receiverId) {
        return chatService.getMessagesBetweenUsers(senderId, receiverId);
    }

    @PostMapping("/seen/{messageId}")
    public void markAsSeen(@PathVariable String messageId, @RequestParam String userId) {
        chatService.markAsSeen(messageId, userId);
    }

    @PostMapping("/delivered/{messageId}")
    public void markAsDelivered(@PathVariable String messageId, @RequestParam String userId) {
        chatService.markAsDelivered(messageId, userId);
    }

    @PutMapping("/edit/{messageId}")
    public ChatMessage editMessage(@PathVariable String messageId, @RequestParam String content) {
        return chatService.editMessage(messageId, content);
    }

    @DeleteMapping("/delete/{messageId}")
    public void softDeleteMessage(@PathVariable String messageId) {
        chatService.softDeleteMessage(messageId);
    }

    @GetMapping("/{messageId}")
    public Optional<ChatMessage> getMessageById(@PathVariable String messageId) {
        return chatService.getMessageById(messageId);
    }

    // ========================= WebSocket Mapping =========================

    @MessageMapping("/chat.send")
    @SendTo("/queue/messages")
    public ChatMessage processMessage(@Payload ChatMessage message) { 
        return chatService.sendMessage(message);
    }
}
