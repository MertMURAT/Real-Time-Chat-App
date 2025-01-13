package com.mert.chat.chat;

import lombok.Getter;

@Getter
public class ChatMessage {
    private MessageType type;
    private String content;
    private String sender;
}
