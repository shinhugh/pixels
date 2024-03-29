package org.dev.pixels.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public class IncomingMessage {
    private Type type;
    private Map<String, ?> payload;

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Map<String, ?> getPayload() {
        return payload;
    }

    public void setPayload(Map<String, ?> payload) {
        this.payload = payload;
    }

    public enum Type {
        @JsonProperty("game_join")
        GAME_JOIN,
        @JsonProperty("game_input")
        GAME_INPUT,
        @JsonProperty("game_chat")
        GAME_CHAT
    }
}
