package org.dev.pixels.service.exception;

public class ConflictException extends RuntimeException {
    public ConflictException() {
        super("Conflict");
    }

    public ConflictException(String message) {
        super(message);
    }
}
