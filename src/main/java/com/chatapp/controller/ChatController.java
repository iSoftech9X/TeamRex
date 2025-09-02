package com.chatapp.controller;

import com.chatapp.model.ChatMessage;
import com.chatapp.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatService chatService;

    // ========================= REST APIs =========================

    // Fetch chat history between two users
    @GetMapping("/messages")
    public List<ChatMessage> getMessages(@RequestParam String senderId, @RequestParam String receiverId) {
        return chatService.findMessagesBetweenUsers(senderId, receiverId);
    }

    // Mark message as seen
    @PostMapping("/seen/{messageId}")
    public void markAsSeen(@PathVariable String messageId, @RequestParam String userId) {
        chatService.markAsSeen(messageId, userId);

        chatService.findMessageById(messageId).ifPresent(updatedMessage -> {
            messagingTemplate.convertAndSendToUser(
                updatedMessage.getSenderId(),
                "/queue/message-updates",
                updatedMessage
            );
            messagingTemplate.convertAndSendToUser(
                updatedMessage.getReceiverId(),
                "/queue/message-updates",
                updatedMessage
            );
        });
    }

    // Mark message as delivered
    @PostMapping("/delivered/{messageId}")
    public void markAsDelivered(@PathVariable String messageId, @RequestParam String userId) {
        chatService.markAsDelivered(messageId, userId);

        chatService.findMessageById(messageId).ifPresent(updatedMessage -> {
            messagingTemplate.convertAndSendToUser(
                updatedMessage.getSenderId(),
                "/queue/message-updates",
                updatedMessage
            );
            messagingTemplate.convertAndSendToUser(
                updatedMessage.getReceiverId(),
                "/queue/message-updates",
                updatedMessage
            );
        });
    }

//    // Edit latest message (with 5 min window)
//    @PatchMapping("/edit/{messageId}")
//    public ChatMessage editMessage(@PathVariable String messageId,
//                                   @RequestParam String content,
//                                   @RequestParam String senderId) {
//        ChatMessage updated = chatService.editMessage(messageId, content, senderId);
//
//        messagingTemplate.convertAndSendToUser(
//            updated.getSenderId(),
//            "/queue/message-updates",
//            updated
//        );
//        messagingTemplate.convertAndSendToUser(
//            updated.getReceiverId(),
//            "/queue/message-updates",
//            updated
//        );
//
//        return updated;
//    }
    
    @PatchMapping("/edit/{messageId}")
    public Map<String, Object> editMessage(@PathVariable String messageId,
                                           @RequestBody Map<String, String> request) {
        String newContent = request.get("newContent");
        String senderId = request.get("senderId");
        String receiverId = request.get("receiverId");

        ChatMessage updatedMsg = chatService.editMessage(messageId, newContent, senderId);

        // Notify both sender & receiver in real-time
        messagingTemplate.convertAndSendToUser(senderId, "/queue/message-updates", updatedMsg);
        messagingTemplate.convertAndSendToUser(receiverId, "/queue/message-updates", updatedMsg);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("updatedMessageId", messageId);
        response.put("newContent", updatedMsg.getContent());
        response.put("message", "Message edited successfully");
        return response;
    }



//    @DeleteMapping("/delete/{messageId}")
//    public void hardDeleteMessage(@PathVariable String messageId) {
//        Optional<ChatMessage> deletedMsgOpt = chatService.findMessageById(messageId);
//
//        chatService.hardDeleteMessageById(messageId);
//
//    
//        deletedMsgOpt.ifPresent(deletedMessage -> {
//            messagingTemplate.convertAndSendToUser(
//                deletedMessage.getSenderId(),
//                "/queue/message-deleted",
//                messageId
//            );
//            messagingTemplate.convertAndSendToUser(
//                deletedMessage.getReceiverId(),
//                "/queue/message-deleted",
//                messageId
//            );
//        });
//    }
    @DeleteMapping("/delete/{messageId}")
    public Map<String, Object> deleteMessage(@PathVariable String messageId,
                                             @RequestBody Map<String, String> request) {
        String senderId = request.get("senderId");
        String receiverId = request.get("receiverId");

        chatService.hardDeleteMessageById(messageId);

        // Notify both sender & receiver
        messagingTemplate.convertAndSendToUser(senderId, "/queue/message-deleted", messageId);
        messagingTemplate.convertAndSendToUser(receiverId, "/queue/message-deleted", messageId);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("deletedMessageId", messageId);
        response.put("message", "Message deleted successfully");
        return response;
    }

    // Fetch a single message by id
    @GetMapping("/{messageId}")
    public Optional<ChatMessage> getMessageById(@PathVariable String messageId) {
        return chatService.findMessageById(messageId);
    }

    // ========================= WebSocket Mapping =========================
    @MessageMapping("/chat.send")
    public void processMessage(@Payload ChatMessage message) {
        ChatMessage savedMessage = chatService.createMessage(message);

        // Send to the specific receiver
        messagingTemplate.convertAndSendToUser(
            message.getReceiverId(),
            "/queue/messages",
            savedMessage
        );

        // Also confirm to the sender
        messagingTemplate.convertAndSendToUser(
            message.getSenderId(),
            "/queue/messages",
            savedMessage
        );
    }
}
