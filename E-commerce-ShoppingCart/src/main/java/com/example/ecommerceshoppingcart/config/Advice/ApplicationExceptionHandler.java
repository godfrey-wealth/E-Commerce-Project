package com.example.ecommerceshoppingcart.config.Advice;



import com.example.ecommerceshoppingcart.config.exception.AlreadyExistsExceptionMessage;
import com.example.ecommerceshoppingcart.config.exception.ExceptionMessages;
import com.example.ecommerceshoppingcart.config.exception.ProductNotFoundWithThatIDException;
import com.example.ecommerceshoppingcart.config.exception.userNotFoundException;
import com.example.ecommerceshoppingcart.security.auth.UnauthorizedDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApplicationExceptionHandler {
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleInvaidArgument(MethodArgumentNotValidException ex)
    {
        Map<String, String> errorMap = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach( error->{
            errorMap.put(error.getField(), error.getDefaultMessage());
        });

        return  errorMap;
    }
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(userNotFoundException.class)
    public  Map<String, String> handleBusinessExption(userNotFoundException ex)
    {
        Map<String, String> errorMap = new HashMap<>();

        errorMap.put("errorMessage", ex.getMessage());

        return errorMap;
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(ProductNotFoundWithThatIDException.class)
    public  Map<String, String> handleBusinessExption(ProductNotFoundWithThatIDException ex)
    {
        Map<String, String> errorMap = new HashMap<>();

        errorMap.put("errorMessage", ex.getMessage());

        return errorMap;
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(ExceptionMessages.class)
    public  Map<String, String> handleBusinessExption( ExceptionMessages ex)
    {
        Map<String, String> errorMap = new HashMap<>();

        errorMap.put("errorMessage", ex.getMessage());

        return errorMap;
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(AlreadyExistsExceptionMessage.class)
    public  Map<String, String> handleBusinessExption( AlreadyExistsExceptionMessage ex)
    {
        Map<String, String> errorMap = new HashMap<>();

        errorMap.put("errorMessage", ex.getMessage());

        return errorMap;
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(UnauthorizedDataAccessException.class)
    public  Map<String, String> handleBusinessExption( UnauthorizedDataAccessException ex)
    {
        Map<String, String> errorMap = new HashMap<>();

        errorMap.put("errorMessage", ex.getMessage());

        return errorMap;
    }

}
