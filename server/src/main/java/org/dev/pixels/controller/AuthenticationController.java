package org.dev.pixels.controller;

import org.dev.pixels.model.Credentials;
import org.dev.pixels.model.Session;
import org.dev.pixels.service.external.ExternalAuthenticationService;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

import static java.lang.System.currentTimeMillis;

@RestController
@RequestMapping("/api/auth")
@Order(-1)
public class AuthenticationController {
    private final ExternalAuthenticationService externalAuthenticationService;

    public AuthenticationController(ExternalAuthenticationService externalAuthenticationService) {
        this.externalAuthenticationService = externalAuthenticationService;
    }

    @PostMapping
    public ResponseEntity<Session> login(Authentication authentication, @RequestBody(required = false) Credentials credentials) {
        long currentTime = currentTimeMillis();
        Session session = externalAuthenticationService.login(authentication, credentials);
        long maxAge = (session.getExpirationTime() - currentTime) / 1000;
        String xAuthorizationCookieHeaderValue = "X-Authorization=" + session.getToken() + "; Path=/; Max-Age=" + maxAge + "; SameSite=Strict";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", xAuthorizationCookieHeaderValue);
        return new ResponseEntity<>(session, headers, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Void> logout(Authentication authentication, @RequestParam Map<String, String> parameters) {
        boolean all = false;
        if (parameters.containsKey("all")) {
            String value = parameters.get("all");
            if (Objects.equals("", value) || Objects.equals("true", value) || Objects.equals("1", value)) {
                all = true;
            }
        }
        externalAuthenticationService.logout(authentication, all);
        String xAuthorizationCookieHeaderValue = "X-Authorization=; Max-Age=0; SameSite=Strict";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", xAuthorizationCookieHeaderValue);
        return new ResponseEntity<>(null, headers, HttpStatus.OK);
    }
}
