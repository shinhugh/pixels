package org.dev.pixels.controller.advice;

import org.dev.pixels.service.exception.NotAuthenticatedException;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@Order(-1)
public class NotAuthenticatedAdvice {
    @ResponseBody
    @ExceptionHandler(NotAuthenticatedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    String handleException(NotAuthenticatedException ex) {
        return ex.getMessage();
    }
}
