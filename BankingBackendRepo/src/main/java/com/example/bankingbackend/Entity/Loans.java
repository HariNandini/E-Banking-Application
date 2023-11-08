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


@Builder
@Table(name = "loans")
public class Loans {
	 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "loan_id")
	private Long loanId;
	
	@Column(name = "loan_type")
	private String loanType;
	
	@Size(min = 3,max = 15, message = "{firstname.invalid}")
	@NotBlank(message = "FirstName is mandatroy")
	@Column(name = "first_name")
	private String firstName;
	
	@Size(min = 3,max = 15, message = "{lastname.invalid}")
	@NotBlank(message = "LastName is mandatroy")
	@Column(name = "last_name")
	private String lastName;
	
	@Min(value = 1000000000000000L, message = "Card number should be 16 digits")
	@Max(value = 9999999999999999L, message = "Card number should be 16 digits")
	@Column(name = "card_no",unique=true)
	private Long cardNo;
	
	@Column(name = "total_loan_amount")
	private Long totalLoanAmt;
	
	private String tenure;
	
	@Column(name = "interest_rate")
	private float interestRate;
	
	@Column(name = "installment")
	private float installment;
	
	@Column(name = "balance_Amount")
	private float balanceAmt;
	
	@Column(name="status")
	private String status;
	
	public Loans() {}

	public Loans(Long loanId, String loanType,
			@Size(min = 3, max = 15, message = "{firstname.invalid}") @NotBlank(message = "FirstName is mandatroy") String firstName,
			@Size(min = 3, max = 15, message = "{lastname.invalid}") @NotBlank(message = "LastName is mandatroy") String lastName,
			@Min(value = 1000000000000000L, message = "Card number should be 16 digits") @Max(value = 999999999999999L, message = "Card number should be 16 digits") Long cardNo,
			Long totalLoanAmt, String tenure, float interestRate, float installment, float balanceAmt,String status) {
		super();
		this.loanId = loanId;
		this.loanType = loanType;
		this.firstName = firstName;
		this.lastName = lastName;
		this.cardNo = cardNo;
		this.totalLoanAmt = totalLoanAmt;
		this.tenure = tenure;
		this.interestRate = interestRate;
		this.installment = installment;
		this.balanceAmt = balanceAmt;
		this.status=status;
	}

	public Long getLoanId() {
		return loanId;
	}

	public void setLoanId(Long loanId) {
		this.loanId = loanId;
	}

	public String getLoanType() {
		return loanType;
	}

	public void setLoanType(String loanType) {
		this.loanType = loanType;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Long getCardNo() {
		return cardNo;
	}

	public void setCardNo(Long cardNo) {
		this.cardNo = cardNo;
	}

	public Long getTotalLoanAmt() {
		return totalLoanAmt;
	}

	public void setTotalLoanAmt(Long totalLoanAmt) {
		this.totalLoanAmt = totalLoanAmt;
	}

	public String getTenure() {
		return tenure;
	}

	public void setTenure(String tenure) {
		this.tenure = tenure;
	}

	public float getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(float interestRate) {
		this.interestRate = interestRate;
	}

	public float getInstallment() {
		return installment;
	}

	public void setInstallment(float installment) {
		this.installment = installment;
	}

	public float getBalanceAmt() {
		return balanceAmt;
	}

	public void setBalanceAmt(float balanceAmt) {
		this.balanceAmt = balanceAmt;
	}

	public synchronized String getStatus() {
		return status;
	}

	public synchronized void setStatus(String status) {
		this.status = status;
	}


	
	

}
