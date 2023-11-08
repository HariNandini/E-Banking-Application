package com.example.bankingbackend.Entity;

public class LoginForm {
	
	    private String customerId;
	    private String emailId;
	    private String password;
	    
		public synchronized String getCustomerId() {
			return customerId;
		}
		public synchronized void setCustomerId(String customerId) {
			this.customerId = customerId;
		}
		public synchronized String getEmailId() {
			return emailId;
		}
		public synchronized void setEmailId(String emailId) {
			this.emailId = emailId;
		}
		public synchronized String getPassword() {
			return password;
		}
		public synchronized void setPassword(String password) {
			this.password = password;
		}
	    
	    

}
