package com.example.bankingbackend.Entity;

public class JwtRequest {

	private String emailId;
	private String password;

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
		return password;
	}

	public JwtRequest(String emailId, String password) {
		super();
		this.emailId = emailId;
		this.password = password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public JwtRequest() {
		super();
	}

}