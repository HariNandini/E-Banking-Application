package com.example.bankingbackend.Entity;
public class PasswordRequest {
    private String password;
    private String  customerId;
    // Getter and Setter

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

	public synchronized String getCustomerId() {
		return customerId;
	}

	public synchronized void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
    
}
