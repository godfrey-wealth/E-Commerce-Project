package com.example.ecommerceshoppingcart.configuration.Advice;//package com.example.assignmentwebshopproject.configuration.Advice;
//
//
//import com.example.assignmentwebshopproject.configuration.exception.ExceptionMessage;
//import com.example.assignmentwebshopproject.configuration.exception.MessageSuccessException;
//import com.example.assignmentwebshopproject.configuration.exception.ProductNotFoundWithThatIDException;
//import com.example.assignmentwebshopproject.configuration.exception.userNotFoundException;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.MethodArgumentNotValidException;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.ResponseStatus;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@RestControllerAdvice
//public class ApplicationExceptionHandler {
//    @ResponseBody
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public Map<String, String> handleInvaidArgument(MethodArgumentNotValidException ex)
//    {
//        Map<String, String> errorMap = new HashMap<>();
//
//        ex.getBindingResult().getFieldErrors().forEach( error->{
//            errorMap.put(error.getField(), error.getDefaultMessage());
//        });
//
//        return  errorMap;
//    }
//    @ResponseBody
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    @ExceptionHandler(userNotFoundException.class)
//    public  Map<String, String> handleBusinessExption(userNotFoundException ex)
//    {
//        Map<String, String> errorMap = new HashMap<>();
//
//        errorMap.put("errorMessage", ex.getMessage());
//
//        return errorMap;
//    }
//
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    @ExceptionHandler(ProductNotFoundWithThatIDException.class)
//    public  Map<String, String> handleBusinessExption(ProductNotFoundWithThatIDException ex)
//    {
//        Map<String, String> errorMap = new HashMap<>();
//
//        errorMap.put("errorMessage", ex.getMessage());
//
//        return errorMap;
//    }
//    @ResponseStatus(HttpStatus.ACCEPTED)
//    @ExceptionHandler(MessageSuccessException.class)
//    public  Map<String, String> handleBusinessExption(MessageSuccessException ex)
//    {
//        Map<String, String> errorMap = new HashMap<>();
//
//        errorMap.put("errorMessage", ex.getMessage());
//
//        return errorMap;
//    }
//
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    @ExceptionHandler(ExceptionMessage.class)
//    public  Map<String, String> handleBusinessExption( ExceptionMessage ex)
//    {
//        Map<String, String> errorMap = new HashMap<>();
//
//        errorMap.put("errorMessage", ex.getMessage());
//
//        return errorMap;
//    }
//
//
//}
