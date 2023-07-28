package org.dev.commander.service.external;

import org.dev.commander.model.Friendships;
import org.dev.commander.service.exception.ConflictException;
import org.dev.commander.service.exception.NotAuthenticatedException;
import org.dev.commander.service.exception.NotFoundException;
import org.springframework.security.core.Authentication;

public interface ExternalFriendshipService {
    Friendships listFriendships(Authentication authentication) throws NotAuthenticatedException;
    void requestFriendship(Authentication authentication, Long accountId) throws NotAuthenticatedException, IllegalArgumentException, NotFoundException, ConflictException;
    void terminateFriendship(Authentication authentication, Long accountId) throws NotAuthenticatedException, IllegalArgumentException, NotFoundException;
}