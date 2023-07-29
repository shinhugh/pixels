package org.dev.commander.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class OutgoingMessage<T> {
    private Type type;
    private T payload;

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }

    public enum Type {
        @JsonProperty("friendships_change")
        FRIENDSHIPS_CHANGE,
        @JsonProperty("game_eviction")
        GAME_EVICTION
    }
}
