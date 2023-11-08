package com.example.bankingbackend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingbackend.Entity.TransactionHistory;
import com.example.bankingbackend.repository.TransactionHistoryRepository;


@Service
public class TransactionHistoryService {
	
	@Autowired
	private TransactionHistoryRepository transactionHistoryRepo;
	
	public boolean addTransactionHistory(TransactionHistory t)
	{
		transactionHistoryRepo.save(t);
		return true;
	}

	public List<TransactionHistory> getTransactionHistoryForAcc(Long accountNo) {
		// TODO Auto-generated method stub
		List<TransactionHistory> l = transactionHistoryRepo.findByAccountNo(accountNo);
		return l;
	}
	
	
	

}
