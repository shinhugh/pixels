package org.dev.pixels.model.game;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Map;
import java.util.Set;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class GameState {
    private long clientPlayerId;
    private long snapshotTime;
    private Space space;
    private Map<Long, Character> characters;
    private Set<Obstacle> obstacles;

    public long getClientPlayerId() {
        return clientPlayerId;
    }

    public void setClientPlayerId(long clientPlayerId) {
        this.clientPlayerId = clientPlayerId;
    }

    public long getSnapshotTime() {
        return snapshotTime;
    }

    public void setSnapshotTime(long snapshotTime) {
        this.snapshotTime = snapshotTime;
    }

    public Space getSpace() {
        return space;
    }

    public void setSpace(Space space) {
        this.space = space;
    }

    public Map<Long, Character> getCharacters() {
        return characters;
    }

    public void setCharacters(Map<Long, Character> characters) {
        this.characters = characters;
    }

    public Set<Obstacle> getObstacles() {
        return obstacles;
    }

    public void setObstacles(Set<Obstacle> obstacles) {
        this.obstacles = obstacles;
    }
}
