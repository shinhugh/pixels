package org.dev.commander.service.internal;

import org.dev.commander.model.IncomingMessage;
import org.dev.commander.model.game.GameInput;
import org.dev.commander.model.game.GameState;
import org.dev.commander.model.game.Space;
import org.dev.commander.websocket.IncomingMessageHandler;
import org.dev.commander.websocket.IncomingMessageReceiver;
import org.dev.commander.websocket.OutgoingMessageSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import static java.lang.System.currentTimeMillis;

@Service
public class GameManager implements IncomingMessageHandler {
    private static final long PROCESS_INTERVAL = 1000; // TODO: Set to ~50
    private static final long BROADCAST_INTERVAL = 1500; // TODO: Set to ~100
    private final OutgoingMessageSender outgoingMessageSender;
    private final GameEntry game = generateGameEntry();

    public GameManager(OutgoingMessageSender outgoingMessageSender, IncomingMessageReceiver incomingMessageReceiver) {
        this.outgoingMessageSender = outgoingMessageSender;
        incomingMessageReceiver.registerIncomingMessageHandler(this);
        game.resetProcessingPoint();
    }

    @Override
    public void handleIncomingMessage(IncomingMessage<?> message) {
        // TODO: Check type and return if wrong type
        // TODO: Handle game input
    }

    @Scheduled(fixedRate = PROCESS_INTERVAL)
    public void process() {
        game.process();
    }

    @Scheduled(fixedRate = BROADCAST_INTERVAL)
    public void broadcast() {
        GameState snapshot = game.snapshot();
        // TODO: Use outgoingMessageSender to broadcast snapshot to all appropriate clients
    }

    private static GameEntry generateGameEntry() {
        Space space = new Space();
        space.setWidth(25);
        space.setHeight(25);
        GameState gameState = new GameState();
        // TODO: Initialize game state
        gameState.setPlayers(new HashSet<>());
        gameState.setSpace(space);
        gameState.setCharacters(new HashSet<>());
        return new GameEntry(gameState);
    }

    private static class GameEntry {
        private long lastProcessTime;
        private final List<GameInput> inputQueue = new ArrayList<>();
        private final Lock inputQueueLock = new ReentrantLock();
        private final GameState gameState;
        private final Lock gameStateReadLock;
        private final Lock gameStateWriteLock;

        public GameEntry(GameState gameState) {
            this.gameState = gameState;
            ReadWriteLock gameStateReadWriteLock = new ReentrantReadWriteLock();
            gameStateReadLock = gameStateReadWriteLock.readLock();
            gameStateWriteLock = gameStateReadWriteLock.writeLock();
        }

        public void input(GameInput input) {
            inputQueueLock.lock();
            try {
                inputQueue.add(input);
            }
            finally {
                inputQueueLock.unlock();
            }
        }

        public GameState snapshot() {
            gameStateReadLock.lock();
            try {
                return cloneGameState(gameState);
            }
            finally {
                gameStateReadLock.unlock();
            }
        }

        public void process() {
            long currentTime = currentTimeMillis();
            List<GameInput> inputs = cloneAndClearInputQueue();
            gameStateWriteLock.lock();
            try {
                for (GameInput input : inputs) {
                    processInput(gameState, input);
                }
                processDuration(gameState, currentTime - lastProcessTime);
            }
            finally {
                gameStateWriteLock.unlock();
            }
            lastProcessTime = currentTime;
        }

        public void resetProcessingPoint() {
            this.lastProcessTime = currentTimeMillis();
        }

        private List<GameInput> cloneAndClearInputQueue() {
            List<GameInput> clone;
            inputQueueLock.lock();
            try {
                clone = new ArrayList<>(inputQueue);
                inputQueue.clear();
            }
            finally {
                inputQueueLock.unlock();
            }
            return clone;
        }

        private static void processDuration(GameState gameState, long duration) {
            // TODO: Process `gameState` according to the passage of `duration` ms
        }

        private static void processInput(GameState gameState, GameInput input) {
            // TODO: Apply changes to `gameState` as described by `input`
        }

        private static GameState cloneGameState(GameState gameState) {
            GameState clone = new GameState();
            // TODO: Deep copy `gameState`
            return clone;
        }
    }
}
