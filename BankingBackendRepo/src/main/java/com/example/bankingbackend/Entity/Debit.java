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
@Table(name = "debit")
public class Debit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "cvv")
	private Long cvv;
	@Column(name = "account_no")
	private Long accountNo;

	@Column(name = "card_no")
	private long cardNo;

	@Column(name = "email_id")
	private String emailId;

	@Column(name = "first_name")
	private String firstName;
	@Column(name = "last_name")
	private String lastName;

	@Column(name = "mobile_no")
	private Long mobileNumber;

	@Column(name = "pin_no")
	private Long pinNo;

	@Column(name = "valid_From")
	private String validFrom;

	@Column(name = "valid_Upto")
	private String validUpto;

	@Column(name = "status")
	private String status;

	public Debit() {

	}

	public Debit(Long cvv, Long accountNo, long cardNo, String emailId, String firstName, String lastName,
			Long mobileNumber, Long pinNo, String validFrom, String validUpto, String status) {
		super();
		this.cvv = cvv;
		this.accountNo = accountNo;
		this.cardNo = cardNo;

		this.emailId = emailId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.mobileNumber = mobileNumber;
		this.pinNo = pinNo;
		this.validFrom = validFrom;
		this.validUpto = validUpto;
		this.status = status;
	}

	public synchronized Long getPinNo() {
		return pinNo;
	}

	public synchronized void setPinNo(Long pinNo) {
		this.pinNo = pinNo;
	}

	public synchronized Long getId() {
		return id;
	}

	public synchronized void setId(Long id) {
		this.id = id;
	}

	public synchronized Long getCvv() {
		return cvv;
	}

	public synchronized void setCvv(Long cvv) {
		this.cvv = cvv;
	}

	public synchronized long getCardNo() {
		return cardNo;
	}

	public synchronized void setCardNo(long cardNo) {
		this.cardNo = cardNo;
	}

	public synchronized Long getAccountNo() {
		return accountNo;
	}

	public synchronized void setAccountNo(Long accountNo) {
		this.accountNo = accountNo;
	}

	public synchronized String getEmailId() {
		return emailId;
	}

	public synchronized void setEmailId(String emailId) {
		this.emailId = emailId;
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

	public synchronized Long getMobileNumber() {
		return mobileNumber;
	}

	public synchronized void setMobileNumber(Long mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public synchronized String getValidFrom() {
		return validFrom;
	}

	public synchronized void setValidFrom(String validFrom) {
		this.validFrom = validFrom;
	}

	public synchronized String getValidUpto() {
		return validUpto;
	}

	public synchronized void setValidUpto(String validUpto) {
		this.validUpto = validUpto;
	}

	public synchronized String getStatus() {
		return status;
	}

	public synchronized void setStatus(String status) {
		this.status = status;
	}

}