package com.example.bankingbackend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor

@Builder
@Table(name = "credit")
public class Credit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Min(value = 1000000000000000L, message = "Card number should be 16 digits")
	@Max(value = 9999999999999999L, message = "Card number should be 16 digits")
	@Column(name = "card_num", unique = true)
	private Long cardNo;
	
	@Column(name = "account_no")
	private Long accountNo;
	
	@Column(name = "email_id")
	private String emailId;
	
	@Size(min = 3, max = 15, message = "{firstname.invalid}")
	@NotBlank(message = "FirstName is mandatroy")
	@Column(name = "first_name")
	private String firstName;
	
	@Size(min = 1, max = 15, message = "{lastname.invalid}")
	@NotBlank(message = "LastName is mandatroy")
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "mobile_number")
	private Long mobileNumber;
	
	@Column(name = "pin_no")
	private Long pinNo;
	
	@Column(name = "cvv")
	private Long cvv;
	
	@Column(name = "valid_from")
	private String validFrom;
	
	@Column(name = "valid_upto")
	private String validUpto;
	
	private Long income;
	
	@Column(name = "credit_amount")
	private Long creditAmount;
	
	@Column(name = "credit_balance")
	private Long creditBalance;
	
	private String status;
	
	public Credit() { super();}

	public Credit(Long cardNo, Long accountNo, String emailId, String firstName, String lastName, Long mobileNumber,
			Long pinNo, Long cvv, String validFrom, String validUpto, Long income, Long creditAmount, String status, Long balance) {
		super();
		this.cardNo = cardNo;
		this.accountNo = accountNo;
		this.emailId = emailId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.mobileNumber = mobileNumber;
		this.pinNo = pinNo;
		this.cvv = cvv;
		this.validFrom = validFrom;
		this.validUpto = validUpto;
		this.income = income;
		this.creditAmount = creditAmount;
		this.status = status;
		this.creditBalance = balance;
	}

	public synchronized Long getId() {
		return id;
	}

	public synchronized void setId(Long id) {
		this.id = id;
	}

	public synchronized Long getCardNo() {
		return cardNo;
	}

	public synchronized void setCardNo(Long cardNo) {
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

	public synchronized Long getPinNo() {
		return pinNo;
	}

	public synchronized void setPinNo(Long pinNo) {
		this.pinNo = pinNo;
	}

	public synchronized Long getCvv() {
		return cvv;
	}

	public synchronized void setCvv(Long cvv) {
		this.cvv = cvv;
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

	public synchronized Long getIncome() {
		return income;
	}

	public synchronized void setIncome(Long income) {
		this.income = income;
	}

	public synchronized Long getCreditAmount() {
		return creditAmount;
	}

	public synchronized void setCreditAmount(Long creditAmount) {
		this.creditAmount = creditAmount;
	}

	public Long getCreditBalance() {
		return creditBalance;
	}

	public void setCreditBalance(Long creditBalance) {
		this.creditBalance = creditBalance;
	}

	public synchronized String getStatus() {
		return status;
	}

	public synchronized void setStatus(String status) {
		this.status = status;
	}
	
	
	

}
