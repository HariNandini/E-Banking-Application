package com.example.bankingbackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingbackend.Entity.Loans;
import com.example.bankingbackend.Exception.ResourceNotFoundException;
import com.example.bankingbackend.repository.LoanRepository;

@Service
public class LoanService {
	@Autowired
	private LoanRepository loanRepository;
	
	public void applyLoan(Loans loan)
	{
		loan.setStatus("Waiting for approval");
		loanRepository.save(loan);	
	}
//    public boolean checkStatus(String Status)throws ResourceNotFoundException {
//    	if(loanRepository.findByStatus(Status).equals("Active")) {
//    	return true;
//    	}
//    	else {
//			throw new ResourceNotFoundException("Loan is Not approved");
//		}
//    }
	public boolean checkIfLoanExistsWithDebitCardNo(Long cardNo){
		if (loanRepository.findByCardNo(cardNo) == null) {
			return false;
		}
		return true;
	}

	public Loans getLoanByLoanId(Long loanId)throws ResourceNotFoundException {
		Loans l = loanRepository.findByLoanId(loanId);
		if (l != null) 
			return l;
		return null;
	}

	@SuppressWarnings("null")
	public float getInstallmentByLoanId(Long loanId) {
		Loans l = loanRepository.findByLoanId(loanId);
		if (l != null) {

			return l.getInstallment();
		}
		throw new ResourceNotFoundException("The installments for this loan id doesn't exists");
		//return (Float) null;

	}
	
	public Loans getLoanDetailsByCardNo(Long cardNo)
	{
		Loans l = loanRepository.findByCardNo(cardNo);
		if(l!=null)
		{
			return l;
		}
		return null;
	}

	public List<Loans> getdetailsbystatus(String status) {
		// TODO Auto-generated method stub
		return loanRepository.findByStatus(status);
	}

	public void addDetails(Loans da) {
		// TODO Auto-generated method stub
		loanRepository.save(da);
	}
}
