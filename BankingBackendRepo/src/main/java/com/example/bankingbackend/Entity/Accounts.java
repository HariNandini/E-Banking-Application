package com.example.bankingbackend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor


@Table(name = "Accounts")
@Builder
public class Accounts {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	//customer id,firstname lastname emailId phonenumber
	//login-email password
	@Column(name = "customer_id")
	private String customerId; 
	@Column(name = "account_no")
	private Long accountNo;
	@Column(name = "account_type")
	private String accountType;
	@Column(name = "first_name")
	private String firstName;
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email_id")
	private String emailId;
	@Column(name = "mobile_no")
	private Long mobileNumber;
	
	@Column(name = "address")
	private String Address;
	@Column(name = "state")
	private String State;
	@Column(name = "country")
	private String Country;
	@Column(name = "pan_no")
	private String panNumber;
	
	@Column(name = "balance")
	private float balance;
	
	@Column(name = "status")
	private String status;
	
	public Accounts() {

	}

	
	public Accounts(String customerId, Long accountNo, String accountType, String firstName, String lastName,
			String emailId, Long mobileNumber, String address, String state, String country, String panNumber,
			float balance, String status) {
		super();
		this.customerId = customerId;
		this.accountNo = accountNo;
		this.accountType = accountType;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.mobileNumber = mobileNumber;
		this.Address = address;
		this.State = state;
		this.Country = country;
		this.panNumber = panNumber;
		this.balance = balance;
		this.status = status;
	}



	public synchronized Long getId() {
		return id;
	}

	public synchronized void setId(Long id) {
		this.id = id;
	}

	

	public synchronized String getCustomerId() {
		return customerId;
	}

	public synchronized void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public synchronized Long getAccountNo() {
		return accountNo;
	}

	public synchronized void setAccountNo(Long accountNo) {
		this.accountNo = accountNo;
	}

	public synchronized String getAccountType() {
		return accountType;
	}

	public synchronized void setAccountType(String accountType) {
		this.accountType = accountType;
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

	public synchronized String getAddress() {
		return Address;
	}

	public synchronized void setAddress(String address) {
		Address = address;
	}

	public synchronized String getState() {
		return State;
	}

	public synchronized void setState(String state) {
		State = state;
	}

	public synchronized String getCountry() {
		return Country;
	}

	public synchronized void setCountry(String country) {
		Country = country;
	}

	public synchronized String getPanNumber() {
		return panNumber;
	}

	public synchronized void setPanNumber(String panNumber) {
		this.panNumber = panNumber;
	}



	public synchronized float getBalance() {
		return balance;
	}



	public synchronized void setBalance(float balance) {
		this.balance = balance;
	}



	public synchronized String getStatus() {
		return status;
	}



	public synchronized void setStatus(String status) {
		this.status = status;
	}
	
	
}
