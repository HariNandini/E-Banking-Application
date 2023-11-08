package com.example.bankingbackend.Service;

import com.example.bankingbackend.Entity.Credit;
import com.example.bankingbackend.repository.CreditRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreditService {

	@Autowired
    private CreditRepository creditRepository;
    
	public Credit getCreditDetailsByAccNo(Long accountNo){
    	return creditRepository.findByAccountNo(accountNo);
    }

	public List<Credit> getDetailsByStatus(String string) {
		// TODO Auto-generated method stub
		return creditRepository.findByStatus(string);
	}

	public Credit getDetailsBycardNo(Long cardNo) {
		// TODO Auto-generated method stub
		return creditRepository.findByCardNo(cardNo);
	}

	public void addDetails(Credit da) {
		// TODO Auto-generated method stub
		creditRepository.save(da);
	}
	
	public float getCreditBill(Long CreditNo) {
		Credit c= creditRepository.findByCardNo(CreditNo);
		return c.getCreditAmount()-c.getCreditBalance();
	}
}
