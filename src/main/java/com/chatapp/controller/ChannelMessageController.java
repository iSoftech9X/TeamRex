package com.chatapp.controller;

import com.chatapp.model.ChannelMessage;
import com.chatapp.service.ChannelMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/channel-messages")
@CrossOrigin("*")
public class ChannelMessageController {

    @Autowired
    private ChannelMessageService channelMessageService;

    // Send a new message to a channel
    @PostMapping("/send")
    public ChannelMessage sendMessage(@RequestBody ChannelMessage message) {
        return channelMessageService.sendMessage(message);
    }

    // Get all messages of a channel
    @GetMapping("/{channelId}")
    public List<ChannelMessage> getMessages(@PathVariable String channelId) {
        return channelMessageService.getMessagesByChannelId(channelId);
    }

    // Edit a message
    @PutMapping("/edit")
    public ChannelMessage editMessage(@RequestBody ChannelMessage message) {
        return channelMessageService.updateMessage(message);
    }

    // Soft delete a message
    @DeleteMapping("/delete/{id}")
    public String deleteMessage(@PathVariable String id) {
        channelMessageService.deleteMessage(id);
        return "Message soft deleted successfully.";
    }
}
