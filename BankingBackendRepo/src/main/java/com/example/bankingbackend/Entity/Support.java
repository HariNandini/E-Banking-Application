package com.example.bankingbackend.Entity;

public class Support {
	private String name;
	private String email;
	private String message;
	public synchronized String getName() {
		return name;
	}
	public synchronized void setName(String name) {
		this.name = name;
	}
	public synchronized String getEmail() {
		return email;
	}
	public synchronized void setEmail(String email) {
		this.email = email;
	}
	public synchronized String getMessage() {
		return message;
	}
	public synchronized void setMessage(String message) {
		this.message = message;
	}
	
}
