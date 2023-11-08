package com.example.bankingbackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingbackend.Entity.Accounts;
import com.example.bankingbackend.Entity.Credit;
import com.example.bankingbackend.Entity.Debit;
import com.example.bankingbackend.Entity.Loans;
import com.example.bankingbackend.Service.AccountService;
import com.example.bankingbackend.Service.CreditService;
import com.example.bankingbackend.Service.DebitService;
import com.example.bankingbackend.Service.LoanService;

@RestController

public class AccountController {
	
	@Autowired
	public AccountService accountService;
	
	@Autowired
	public DebitService debitService;
	
	@Autowired
	public CreditService creditService;
	
	@Autowired
	public LoanService loanService;
	
	@GetMapping("/api/admindashboard/accounts")
	public List<Accounts> getAllAccounts() {
		return accountService.getAllAccounts();
	}
	
	@PostMapping("api/admindashboard/addAccount")
	public Accounts addAccount(@RequestBody Accounts account)  {
		return accountService.addAccounts(account);	
	}
	
	@PutMapping("api/admindashboard/updateAccount/{id}")
	public Accounts updateAccount(@PathVariable Long id,@RequestBody Accounts account)
	{
		return accountService.updateAccount(id,account);
	}
	
	@GetMapping("/api/admindashboard/getAccountByCustomerId/{customerId}")
    public List<Accounts> getAccountByCustomerId(@PathVariable String custid)  {
		
		List<Accounts> account = accountService.getAccountByCustomerId(custid);
		return account;
    }
	
	@GetMapping("/api/admindashboard/getAccountById/{id}")
    public List<Accounts> getAccountById(@PathVariable Long id)  {
		
		List<Accounts> account = accountService.getAccountById(id);
		return account;
    }
	
	
//	@GetMapping("/api/user/getAccountById/{customerId}")
//    public List<Accounts> getUserAccountById(@PathVariable String customerId)  {
//		
//		List<Accounts> account = accountService.getAccountByCustomerId(customerId);
//		return account;
//    }
	
	@GetMapping("/api/user/login/getDebitDetails/{accountNo}")
    public Debit getDebitDetails(@PathVariable Long accountNo)  {
		
		if(debitService.checkDebitExistsWithAccNo(accountNo)) 
		{
		Debit debit = debitService.getDebitDetailsByAccNo(accountNo);
		System.out.println(debit.getCardNo());
		return debit;}
		System.out.println("out of if loop");
		return null;
    }
	
	@GetMapping("/api/user/login/getCreditDetails/{accountNo}")
    public Credit getCreditDetails(@PathVariable Long accountNo)  {
		Credit credit = creditService.getCreditDetailsByAccNo(accountNo);
//		System.out.println("Credit Details: "+credit.getCardNo());
		return credit;
    }
	
	@GetMapping("/api/user/login/getLoanDetails/{cardNo}")
    public Loans getLoanDetails(@PathVariable Long cardNo)  {
		System.out.println(cardNo);
		Loans loan = loanService.getLoanDetailsByCardNo(cardNo);
		System.out.println(loan);
		return loan;
    }
	
	
	@DeleteMapping("api/admindashboard/deleteAccount/{id}")
	public void deleteAccountById(@PathVariable long id) {
		accountService.deleteAccount(id);
		
	}

	

}
