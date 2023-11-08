package com.example.bankingbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankingbackend.Entity.Loans;


public interface LoanRepository extends JpaRepository<Loans, Long>{
	
	Loans findByCardNo(Long cardNo);
	
	Loans findByLoanId(Long loanId);

	List<Loans> findByStatus(String string);
	

}
