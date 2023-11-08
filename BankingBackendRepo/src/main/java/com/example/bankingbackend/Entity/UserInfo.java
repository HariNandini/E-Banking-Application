package com.example.bankingbackend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor

@Builder
@Table(name = "UserInfo")
public class UserInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	//login-email password
	@Column(name = "customer_id")
	private String customerId;
	@Column(name = "first_name")
	private String firstName;
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email_id")
	private String emailId;
	@Column(name = "mobile_no")
	private Long mobileNumber;
	
	@Column(name = "password")
	private String password;
	
	public UserInfo() {

	}
	

	


	public UserInfo( String customerId, String firstName, String lastName, String emailId, Long mobileNumber,
			String password) {
		super();
		
		this.customerId = customerId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.mobileNumber = mobileNumber;
		this.password = password;
	}





	public synchronized String getCustomerId() {
		return customerId;
	}





	public synchronized void setCustomerId(String customerId) {
		this.customerId = customerId;
	}





	public synchronized String getpassword() {
		return password;
	}





	public synchronized void setpassword(String password) {
		this.password = password;
	}





	public synchronized Long getId() {
		return id;
	}


	public synchronized void setId(Long id) {
		this.id = id;
	}





	public synchronized String getFirstName() {
		return firstName;
	}





	public synchronized void setFirstName(String firstName) {
		this.firstName = firstName;
	}





	public synchronized String getLastName() {
		return lastName;
	}





	public synchronized void setLastName(String lastName) {
		this.lastName = lastName;
	}





	public synchronized String getEmailId() {
		return emailId;
	}



	public synchronized void setEmailId(String emailId) {
		this.emailId = emailId;
	}





	public synchronized Long getMobileNumber() {
		return mobileNumber;
	}





	public synchronized void setMobileNumber(Long mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	
	

    
}
