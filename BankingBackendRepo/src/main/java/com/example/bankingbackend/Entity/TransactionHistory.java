package com.example.bankingbackend.Entity;

import java.sql.Date;
import java.sql.Timestamp;

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


@Builder
@Table(name="TransactionHistory")
public class TransactionHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long transaction_id;
	
//	transac_id, acc_id, transac_type, amount, source, status, reason_code, created_at
//	transac_type withdraw,deposit, debit card, credit card
//	    reason_code----->success, failure
	
	@Column(name = "account_no")
	private Long accountNo;
	
	@Column(name = "transaction_type")
	private String transactionType;
	
	@Column(name= "amount")
	private float amount;
	
	@Column(name = "to_account")
	private Long to_account;
	
	@Column(name = "status")
	private String transactionStatus;
	
	@Column(name = "Created_at")
	private String  createdDate;

	
	
	public TransactionHistory() {
		super();
	}

	public TransactionHistory(Long transaction_id, Long accountNo, String trasactionType, float amount,
			Long to_account, String transactionStatus, String createdDate) {
		super();
		this.transaction_id = transaction_id;
		this.accountNo = accountNo;
		this.transactionType = trasactionType;
		this.amount = amount;
		this.to_account = to_account;
		this.transactionStatus = transactionStatus;
		this.createdDate = createdDate;
	}

	public Long getTransaction_id() {
		return transaction_id;
	}

	public void setTransaction_id(Long transaction_id) {
		this.transaction_id = transaction_id;
	}

	public Long getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(Long accountNo) {
		this.accountNo = accountNo;
	}

	public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String trasactionType) {
		this.transactionType = trasactionType;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

	public Long getTo_account() {
		return to_account;
	}

	public void setTo_account(Long to_account) {
		this.to_account = to_account;
	}

	public String getTransactionStatus() {
		return transactionStatus;
	}

	public void setTransactionStatus(String transactionStatus) {
		this.transactionStatus = transactionStatus;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}	
	
}
