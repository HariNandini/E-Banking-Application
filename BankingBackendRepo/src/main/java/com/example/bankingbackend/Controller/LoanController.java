package com.example.bankingbackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingbackend.Entity.Debit;
import com.example.bankingbackend.Entity.Loans;
import com.example.bankingbackend.Entity.Notifications;
import com.example.bankingbackend.Exception.BadRequestException;
import com.example.bankingbackend.Exception.ResourceNotFoundException;
import com.example.bankingbackend.Service.DebitService;
import com.example.bankingbackend.Service.LoanService;
import com.example.bankingbackend.Service.NotificationsService;

@RestController
public class LoanController {

	@Autowired
	public LoanService loanService;

	@Autowired
	public DebitService debitService;

	@Autowired
	private NotificationsService notificationsService;
	
	@GetMapping("/api/admindashboard/LoanapprovalsHistory")
	public List<Loans> LoanapprovalsHistory() {
		List<Loans> dh=loanService.getdetailsbystatus("Waiting for approval");
		//List<Loans> dh = loanrepository.findByStatus("Waiting for approval");
		System.out.println(dh);
		return dh;
	}

	@GetMapping("/api/admindashboard/LoanapprovedHistory")
	public List<Loans> DebitapprovedHistory() {
		List<Loans> dh=loanService.getdetailsbystatus("Active");
		//List<Loans> dh = loanrepository.findByStatus("Approved");
		System.out.println(dh);
		return dh;
	}

	@PostMapping("/api/admindashboard/updateLoanstatus/{cardNo}")
	public boolean updatestatustoapprove(@PathVariable Long cardNo) {
		Loans da=loanService.getLoanDetailsByCardNo(cardNo);
		//Loans da = loanrepository.findByCardNo(cardNo);
		System.out.println(cardNo + " " + da.getStatus());
		
		Debit d=debitService.getDebitDetails(cardNo);
		System.out.println(d.getEmailId());
		
		Notifications n=notificationsService.getnotificationsDetails(cardNo,"Loan");
		
		n.setStatus("Active");
		notificationsService.saveAccounts(n);
		
		da.setStatus("Active");
		loanService.addDetails(da);
//		loanrepository.save(da);
		return true;

	}

	@PostMapping("api/user/applyLoan")
	public boolean addLoan(@RequestBody Loans loan) throws ResourceNotFoundException,BadRequestException{
		Long cardNo = loan.getCardNo();
		System.out.println("cardNo: " + loan.getCardNo());
		if (debitService.checkDebitExists(cardNo)) {
			if (!loanService.checkIfLoanExistsWithDebitCardNo(cardNo)) {
				System.out.println(loanService.checkIfLoanExistsWithDebitCardNo(cardNo));
				System.out.println(debitService.checkDebitExists(cardNo)+"\ncardNo: "+cardNo);
				System.out.println("cardNo: "+loan.getCardNo());
				
				Debit d=debitService.getDebitDetails(cardNo);
				
				Notifications n=new Notifications();
				n.setEmailId(d.getEmailId());
				n.setCardNo(d.getCardNo());
				
				n.setNotificationType("Loan");
				n.setStatus("Waiting for approval");
				notificationsService.saveAccounts(n);
				
				loanService.applyLoan(loan);
				System.out.println("loan applied");
				return true;
			} 
			else {
				System.out.println("Couldn't apply loan. Loan already exists with this cardNo");
				//return false;
				throw new BadRequestException("Loan already exists with this cardNo");
			}

		} else {
			System.out.print("Debit Card number doesn't exist");
			//return false;
			throw new ResourceNotFoundException("Debit card number does't exist");
		}
	}
}
