package com.example.bankingbackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingbackend.Entity.Debit;
import com.example.bankingbackend.Exception.BadRequestException;
import com.example.bankingbackend.Exception.ResourceNotFoundException;
import com.example.bankingbackend.repository.DebitRepository;
@Service
public class DebitService {
	@Autowired
	private DebitRepository debitRepository;
	
	public Debit getDebitDetails(Long cardNo) throws ResourceNotFoundException{
		Debit d = debitRepository.findByCardNo(cardNo);
		if (d == null) {
            throw new ResourceNotFoundException("Debit details not found for cardNo : " + cardNo);
        }
		return d;
    }
	
	public Debit getDebitDetailsByAccNo(Long accountNo) {
		Debit d = debitRepository.findByAccountNo(accountNo);
		return d;
    }
	
	public boolean checkDebitExists(Long cardNo)throws BadRequestException
	{
		System.out.println(debitRepository.findByCardNo(cardNo));
		if(debitRepository.findByCardNo(cardNo)!= null)
			
			return true;
		else {
			throw new BadRequestException("Card number cannot be null");
		}
			
	}
	
	public boolean checkDebitExistsWithAccNo(Long accNo)
	{
		if(debitRepository.findByAccountNo(accNo)!= null)
			return true;
		else
			return false;
	}

	public List<Debit> getDetailsbyStatus(String status) {
		// TODO Auto-generated method stub
		return  debitRepository.findByStatus(status);
	}

	public void addDetails(Debit da) {
		// TODO Auto-generated method stub
		debitRepository.save(da);
		
	}
}
