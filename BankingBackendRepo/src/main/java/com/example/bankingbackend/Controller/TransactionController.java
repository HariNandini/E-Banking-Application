package com.example.bankingbackend.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingbackend.Entity.Accounts;
import com.example.bankingbackend.Entity.Credit;
import com.example.bankingbackend.Entity.Debit;
import com.example.bankingbackend.Entity.Loans;
import com.example.bankingbackend.Entity.TransactionHistory;
import com.example.bankingbackend.Exception.BadRequestException;
import com.example.bankingbackend.Exception.ResourceNotFoundException;
import com.example.bankingbackend.Exception.ValidationException;
import com.example.bankingbackend.Service.AccountService;
import com.example.bankingbackend.Service.CreditService;
import com.example.bankingbackend.Service.DebitService;
import com.example.bankingbackend.Service.LoanService;
import com.example.bankingbackend.Service.TransactionHistoryService;

@RestController
public class TransactionController {
	@Autowired
	public LoanService loanService;
	@Autowired
	private AccountService accountService;
	@Autowired
	private DebitService debitService;
	@Autowired
	private CreditService creditService;

	@Autowired
	private TransactionHistoryService transactionHistoryService;

	@PutMapping("/api/user/transactions/deposit/{accountNo}/{amount}")
    public boolean deposit(@PathVariable Long accountNo, @PathVariable Long amount) throws ResourceNotFoundException
	{
		boolean accExists= accountService.checkAccountExists(accountNo);
		System.out.println("in meth");
		if(!accExists)
		{
			throw new ResourceNotFoundException("Account doesnot exists");
		}
		else
		{
			Accounts account= accountService.getAccWithAccNo(accountNo);
			account.setBalance(account.getBalance()+amount);
			accountService.saveAccounts(account);
			System.out.println("Deposited : "+amount);
			long timestamp = System.currentTimeMillis();
	        Date date = new Date(timestamp);
	        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        String sqlDate = dateFormat.format(date);
	        TransactionHistory t = new TransactionHistory(null, accountNo, "Deposit", amount, accountNo, "success", sqlDate);
			transactionHistoryService.addTransactionHistory(t);
			return true;
		}
	}

	@PutMapping("/api/user/transactions/debitWithDrawal/{debitNo}/{amount}")
    public boolean debitWithDrawal(@PathVariable Long debitNo, @PathVariable Long amount) throws  ResourceNotFoundException, ValidationException
	{
		Debit d= debitService.getDebitDetails(debitNo);
		if(d.getStatus().equals("Active"))
		{
		if(d==null)
		{
			throw new ResourceNotFoundException("Debit card doesn't exists");
		}
		else
		{
			Accounts account= accountService.getAccWithAccNo(d.getAccountNo());
			float balance = account.getBalance();
			if(balance<amount)
			{
				throw new ValidationException("Balance is lower than withdrawal amount");
			}
			else
			{
				account.setBalance(account.getBalance()-amount);
				accountService.saveAccounts(account);
				System.out.println("Withdrawn : "+amount);
				long timestamp = System.currentTimeMillis();
		        Date date = new Date(timestamp);
		        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		        String sqlDate = dateFormat.format(date);
		        System.out.println(sqlDate);
				TransactionHistory t = new TransactionHistory(null, d.getAccountNo(), "Debit-WithDrawal", amount, d.getAccountNo(), "success",sqlDate);
				transactionHistoryService.addTransactionHistory(t);

				return true;
			}
		}
		}
		else {
			throw new ResourceNotFoundException("Debit Card is not Approved");
		}

	}

	@PutMapping("/api/user/transactions/creditPayment/{creditNo}/{amount}")
    public boolean creditPayment(@PathVariable Long creditNo, @PathVariable Long amount) throws  ResourceNotFoundException, ValidationException
	{
		Credit c= creditService.getDetailsBycardNo(creditNo);
		if(c.getStatus().equals("Active")) {
		if(c==null)
		{
			throw new ResourceNotFoundException("Credit card doesn't exists");
		}
		else
		{
			float balance = c.getCreditBalance();
			if(balance<amount)
			{
				throw new ValidationException("Balance is lower than withdrawal amount");
			}
			else
			{
				c.setCreditBalance(c.getCreditBalance()-amount);
				creditService.addDetails(c);
				System.out.println("Withdrawn : "+amount);
				long timestamp = System.currentTimeMillis();
		        Date date = new Date(timestamp);
		        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		        String sqlDate = dateFormat.format(date);
		        System.out.println(sqlDate);
				TransactionHistory t = new TransactionHistory(null, c.getAccountNo(), "Credit-WithDrawal", amount, c.getAccountNo(), "success",sqlDate);
				transactionHistoryService.addTransactionHistory(t);

				return true;
			}
		}
		}
		else {
			throw new ResourceNotFoundException("Credit Card is not approved");
		}

	}

	@PutMapping("api/user/payLoanTransaction/{loanId}/{accountNo}")
	public boolean payLoan(@PathVariable Long loanId, @PathVariable Long accountNo) throws  ResourceNotFoundException {
		   System.out.println("in method");
		    float l = loanService.getInstallmentByLoanId(loanId);

		    long timestamp = System.currentTimeMillis();
	        Date date = new Date(timestamp);
	        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        String sqlDate = dateFormat.format(date);

//	        System.out.println(sqlDate);


		    Loans loan= loanService.getLoanByLoanId(loanId);
			Accounts account= accountService.getAccWithAccNo(accountNo);
			if(loan.getStatus().equals("Active")) {
			if(loan.getBalanceAmt()>0 )
			{
			if(account.getBalance()>=l) {
				account.setBalance(account.getBalance()-l);
				accountService.saveAccounts(account);

				TransactionHistory t = new TransactionHistory(null, accountNo, "Loan", l, accountNo, "success", sqlDate);
				transactionHistoryService.addTransactionHistory(t);
				loan.setBalanceAmt(loan.getBalanceAmt()-l);
				loanService.addDetails(loan);
				System.out.println("Paid loan : "+l);
				return true;
			}
			else
			{
				TransactionHistory t = new TransactionHistory(null, accountNo, "Loan", l, accountNo, "Failed", sqlDate);
				transactionHistoryService.addTransactionHistory(t);
				System.out.println("Payment Unsuccessful. Insufficient balance");
				return false;
			}
			}

			else {
				throw new ResourceNotFoundException("Loan Completed");
			}
			}
			else
			{
				throw new ResourceNotFoundException("Loan is not Approved");
			}

//			return true;
	}

	@PutMapping("/api/user/transactions/transfer/{accountNoFrom}/{accountNoTo}/{amount}")
    public boolean transfer(@PathVariable Long accountNoFrom, @PathVariable Long accountNoTo, @PathVariable Long amount) throws ResourceNotFoundException, ValidationException,BadRequestException
	{
		boolean accExists= accountService.checkAccountExists(accountNoFrom);
		boolean accExists2= accountService.checkAccountExists(accountNoTo);

		if(!(accExists && accExists2))
		{
			System.out.println("Account doesn't exists."+(accExists && accExists2));
			return false;
			//throw new ResourceNotFoundException("Account doesn't exists."+(accExists && accExists2));
		}
		else
		{
			Accounts accountFrom= accountService.getAccWithAccNo(accountNoFrom);
			Accounts accountTo= accountService.getAccWithAccNo(accountNoTo);
			float balanceFrom = accountFrom.getBalance();
			if(balanceFrom<amount)
			{
				//System.out.println("Insufficient balance");
				//return false;
				throw new BadRequestException("Insufficient Balance");
			}
			else
			{
				accountFrom.setBalance(accountFrom.getBalance()-amount);
				accountTo.setBalance(accountTo.getBalance()+amount);
				accountService.saveAccounts(accountTo);
				accountService.saveAccounts(accountFrom);
				System.out.println("Transfered : "+amount);
//				LocalDateTime currentDateTime = LocalDateTime.now();
//		        Timestamp sqlDate = Timestamp.valueOf(currentDateTime);
				long timestamp = System.currentTimeMillis();
		        Date date = new Date(timestamp);
		        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		        String sqlDate = dateFormat.format(date);
		        System.out.println(sqlDate);
				TransactionHistory t = new TransactionHistory(null, accountNoFrom, "Transfer", amount, accountNoTo, "success", sqlDate);
				transactionHistoryService.addTransactionHistory(t);

				return true;
			}
		}

	}

	@GetMapping("api/user/transactionHistory/{accountNo}")
	public List<TransactionHistory> gettransactionHistory(@PathVariable Long accountNo) throws ResourceNotFoundException, ValidationException
	{
		List<TransactionHistory> th= transactionHistoryService.getTransactionHistoryForAcc(accountNo);
		if(th != null) {
		System.out.println("transaction history: "+th);
		return th;
		}
		else {
			throw new ResourceNotFoundException("Loan is not Approved");
		}
	}

	@GetMapping("api/user/checkIfLoanExistsByLoanId/{loanId}")
	public boolean checkIfLoanExistsByLoanId(@PathVariable Long loanId)
	{
		Loans l=loanService.getLoanByLoanId(loanId);
		if(l==null)
		{
			//System.out.println("Loan dosn't exists with this loan id");
			//return false;
			throw new ResourceNotFoundException("Loan doesn't exists with loan id: "+loanId);
		}
		return true;
	}

	@GetMapping("api/user/getInstallmentByLoanId/{loanId}")
	public float getLoanInstallmentByLoanId(@PathVariable Long loanId)throws ResourceNotFoundException
	{
		Loans loan = loanService.getLoanByLoanId(loanId);
		if(loan.getStatus().equals("Active")) {
		float l=loanService.getInstallmentByLoanId(loanId);

		return l;
		}
		else {
			throw new ResourceNotFoundException("Loan is not Approved");
		}
	}

	@PutMapping("api/user/payCreditBill/{creditNo}/{bill}")
	public boolean payCreditBill(@PathVariable Long creditNo, @PathVariable Long bill) throws ResourceNotFoundException
	{
		    Credit c = creditService.getDetailsBycardNo(creditNo);

		    long timestamp = System.currentTimeMillis();
	        Date date = new Date(timestamp);
	        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        String sqlDate = dateFormat.format(date);

	        System.out.println(sqlDate);

			Accounts account= accountService.getAccWithAccNo(c.getAccountNo());

			if(account.getBalance()>=bill) {
				account.setBalance(account.getBalance()-bill);
				accountService.saveAccounts(account);

				TransactionHistory t = new TransactionHistory(null, c.getAccountNo(), "Credit bill payment", bill, c.getCardNo(), "success", sqlDate);
				transactionHistoryService.addTransactionHistory(t);
				c.setCreditBalance(c.getCreditAmount());
				creditService.addDetails(c);
				System.out.println("Paid credit bill : "+c);
				return true;
			}
			else
			{
				TransactionHistory t = new TransactionHistory(null, c.getAccountNo(), "Credit bill payment", bill, c.getCardNo(), "Failed", sqlDate);
				transactionHistoryService.addTransactionHistory(t);
				System.out.println("Payment Unsuccessful. Insufficient balance");
				throw new ResourceNotFoundException("Insufficient Balance");
			}


	}

	@GetMapping("api/user/getCreditBill/{CreditNo}")
	public float getCreditBill(@PathVariable Long CreditNo)
	{
		float c=creditService.getCreditBill(CreditNo);
		return c;
	}


}