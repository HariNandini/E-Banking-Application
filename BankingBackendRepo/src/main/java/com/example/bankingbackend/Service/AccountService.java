package com.example.bankingbackend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingbackend.Entity.Accounts;
import com.example.bankingbackend.Exception.ResourceNotFoundException;
import com.example.bankingbackend.Exception.ValidationException;
import com.example.bankingbackend.repository.AccountsRepository;

@Service
public class AccountService {

	@Autowired
	private AccountsRepository accountsRepository;

	public boolean checkAccountExists(Long accountNo) throws ResourceNotFoundException, ValidationException {
		Accounts accno = accountsRepository.findByAccountNo(accountNo);
		if (accno == null) {
			 System.out.println("Account doesn't exist");
			 //return true;
			throw new ResourceNotFoundException("Account doesn't exists");
		} else {
			if (accno.getStatus().equals("Active")) {
				return true;
			}
			System.out.println("Account exists but in not inactive");
			// return false;
			throw new ValidationException("Account exists but it is not inactive");
		}
	}

	public Accounts getAccWithAccNo(Long accountNo) {
		Accounts accno = accountsRepository.findByAccountNo(accountNo);
		//System.out.println(accno);
		return accno;

	}

	public void saveAccounts(Accounts account) {
		accountsRepository.save(account);
	}

	public List<Accounts> getAllAccounts() {
		// TODO Auto-generated method stub
		return accountsRepository.findAll();
	}

	public Accounts addAccounts(Accounts account) {
		// TODO Auto-generated method stub
		return accountsRepository.save(account);
	}

	public Accounts updateAccount(long id, Accounts account) {
		Accounts acc = accountsRepository.findById(id).get();
		acc.setFirstName(account.getFirstName());
		acc.setLastName(account.getLastName());
		acc.setEmailId(account.getEmailId());
		acc.setMobileNumber(account.getMobileNumber());
		acc.setAddress(account.getAddress());
		acc.setState(account.getState());
		acc.setCountry(account.getCountry());
		acc.setPanNumber(account.getPanNumber());
		acc.setBalance(account.getBalance());
		acc.setStatus(account.getStatus());

		Accounts updatedAccount = accountsRepository.save(acc);
		return updatedAccount;
	}

	public List<Accounts> getAccountByCustomerId(String customerId) {

		List<Accounts> account = accountsRepository.findByCustomerId(customerId);
		if (account.isEmpty())
			throw new ResourceNotFoundException("Account not found with this id: " + customerId);
		return account;

	}
	
//	public List<Accounts> getAccountById(Long id) {
//		List<Accounts> account = accountsRepository.findAllById(id);
//		if (account.isEmpty())
//			throw new ResourceNotFoundException("Account not found with this id: " + id);
//		return account;
//	}

	public List<Accounts> getAccountByEmailId(String emailId) {
		List<Accounts> account = accountsRepository.findByEmailId(emailId);

		return account;

	}

	public void deleteAccount(long id) {

		Optional<Accounts> account = accountsRepository.findById(id);
		if (account.isEmpty())
			throw new ResourceNotFoundException("id not found");
		accountsRepository.deleteById(id);

	}

	public List<Accounts> getAccountById(Long id) {
		// TODO Auto-generated method stub
		List<Accounts> account = accountsRepository.findAllById(id);
		if (account.isEmpty())
			throw new ResourceNotFoundException("Account not found with this id: " + id);
		return account;
	}

}
