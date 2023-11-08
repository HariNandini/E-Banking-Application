package com.example.bankingbackend.Exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ValidationException.class)
	public final ResponseEntity<ErrorResponse> handleValidationException(Exception ex, WebRequest request)
			throws Exception {
		ErrorResponse error = new ErrorResponse(ex.getMessage(),420,LocalDateTime.now());
		return new ResponseEntity<ErrorResponse>(error, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public final ResponseEntity<ErrorResponse> handleResourceNotFoundException(Exception ex, WebRequest request)
			throws Exception {
		ErrorResponse error = new ErrorResponse(ex.getMessage(),420,LocalDateTime.now());
		return new ResponseEntity<ErrorResponse>(error, HttpStatus.NOT_FOUND);
	}
	
	 @ExceptionHandler(BadRequestException.class)
	    public ResponseEntity<Object> handleBadRequestException(
	            BadRequestException ex, WebRequest request) {
	        ErrorResponse error = new ErrorResponse(ex.getMessage(),400,LocalDateTime.now());
	        return new ResponseEntity<Object>(error, new HttpHeaders(), HttpStatus.BAD_REQUEST);
	    }

}
