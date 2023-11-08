package com.example.bankingbackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingbackend.EmailSenderService;
import com.example.bankingbackend.Entity.BlockorUnBlockCard;
import com.example.bankingbackend.Entity.Credit;
import com.example.bankingbackend.Entity.Notifications;
import com.example.bankingbackend.Entity.setresetPin;
import com.example.bankingbackend.Exception.BadRequestException;
import com.example.bankingbackend.Service.AccountService;
import com.example.bankingbackend.Service.CreditService;
import com.example.bankingbackend.Service.NotificationsService;

import jakarta.validation.ValidationException;

@RestController
public class CreditController {
	
	
	private final EmailSenderService emailService ;
	
	@Autowired
	public CreditService cs;
	
	@Autowired
	private AccountService accountService;
	
	@Autowired
	private NotificationsService notificationsService;

	public CreditController(EmailSenderService emailService) {
		this.emailService = emailService;
	}
	
	@GetMapping("/api/admindashboard/CreditapprovalsHistory")
	public List<Credit> CreditapprovalsHistory() {
		List<Credit> ch=cs.getDetailsByStatus("Waiting for approval");
		//List<Credit> ch = creditrepository.findByStatus("Waiting for approval");
		System.out.println(ch);
		return ch;
	}
	
	
	@GetMapping("/api/admindashboard/CreditApprovedHisory")
	public List<Credit> CreditApprovedHistory(){
		
		List<Credit> ch1 = cs.getDetailsByStatus("Approved");
		List<Credit> ch2 = cs.getDetailsByStatus("Active");
		List<Credit> ch3 = cs.getDetailsByStatus("Block");
		ch1.addAll(ch2);
		ch1.addAll(ch3);
		System.out.println(ch1);
		return ch1;
		
	}
	
	@PostMapping("/api/admindashboard/creditupdatestatus")
	public boolean updatestatustoapprove(@RequestBody Credit credit) {
		
		
		Credit da=cs.getDetailsBycardNo(credit.getCardNo());
		Notifications n=new Notifications();
		n.setEmailId(credit.getEmailId());
		n.setCardNo(credit.getCardNo());
		n.setNotificationType("Credit Card");
		n.setStatus("Approved");
		notificationsService.saveAccounts(n);
//		Notifications n=notificationsService.getnotificationsDetails(da.getCardNo(),"Credit Card");
//		
//		n.setStatus("Approved");
//		notificationsService.saveAccounts(n);
		
			da.setStatus("Approved");
			cs.addDetails(da);
//			creditrepository.save(da);
			return true;

	}

	
	@PostMapping("/api/user/creditaccountnocheck/{accountNo}")
	public boolean accNoCheck(@PathVariable Long accountNo) throws ValidationException{

		if(cs.getCreditDetailsByAccNo(accountNo) != null) {
			throw new ValidationException("This account already exists"); 
			//return false;
		}
			return true;
			
		
	}
	
	@PostMapping("/api/user/applycreditcard")
	public boolean saveCredit(@RequestBody Credit credit) throws ValidationException{
		Long accountNo = credit.getAccountNo();
		System.out.println(credit.getStatus());
		Credit cr=cs.getCreditDetailsByAccNo(accountNo);
		//Credit cr = creditrepository.findByAccountNo(accountNo);
//		System.out.println(accountNo+" "+cr);
		if(cr == null) {
			cs.addDetails(credit);
			//creditrepository.save(credit);
			return true;
		}
		else {
//			throw new BadRequestException("Credit card with this account number already exists");
			System.out.println("Customer already exists");
			//return false;
			throw new ValidationException("Customer already exists");
		}
	}
	@PostMapping("/api/user/setorresetpinforcredit")
	public boolean setPin(@RequestBody setresetPin setPin) throws ValidationException{
		Credit credit = cs.getDetailsBycardNo(setPin.getCardNo());
		//Credit credit = creditrepository.findByCardNo(setPin.getCardNo());
		if( credit == null || credit.getStatus().equals("Waiting for approval..")) {
			System.out.println(setPin.getPinNo() + " " + credit.getStatus());
			throw new ValidationException("The credit card is not approved yet");
		}
		else {
//			Notifications n=notificationsService.getnotificationsDetails(credit.getCardNo(),"Credit Card");
//						
//			n.setStatus("Active");
//			notificationsService.saveAccounts(n);
			if(credit.getPinNo()==null) {
				Notifications n=notificationsService.getnotificationsDetails(credit.getCardNo(),"Credit Card");
				notificationsService.deleteAccounts(n);
			}
			credit.setPinNo(setPin.getPinNo());
			credit.setStatus(setPin.getStatus());
			System.out.println(credit.getPinNo()+" "+ credit.getStatus());
			cs.addDetails(credit);
			
			//creditrepository.save(credit);
			emailService.sendVerificationEmailforsetpin(credit.getEmailId(), credit.getCardNo(), credit.getPinNo());
			System.out.println("Mail Sent..");
			
			return true;
		}
	}
	
	@PostMapping("/api/user/blockcreditcard")
	public boolean BlockCreditCard(@RequestBody BlockorUnBlockCard blockCard) throws BadRequestException {
		Credit credit = cs.getDetailsBycardNo(blockCard.getCardNo());
		//Credit credit = creditrepository.findByCardNo(blockCard.getCardNo());
		System.out.println(blockCard.getCardNo());
		if(credit == null) {
			throw new BadRequestException("Please enter the correct credit card number");
		}
		else if(!credit.getCvv().equals(blockCard.getCvv()) || !credit.getPinNo().equals( blockCard.getPinNo()))
			throw new BadRequestException("Invalid Pin or CVV");
		else if(!credit.getStatus().equals("Active")) {
			throw new BadRequestException("Credit card with given card number is already blocked");
		}
		else {
//			Notifications n=notificationsService.getnotificationsDetails(credit.getCardNo(),"Credit Card");
//			
//			
//			n.setStatus("Block");
//			notificationsService.saveAccounts(n);


			credit.setStatus(blockCard.getStatus());
			
			cs.addDetails(credit);
			//creditrepository.save(credit);
			
			emailService.sendVerificationEmailforBlockPin(credit.getEmailId(), credit.getCardNo());
			System.out.println("Mail Sent..");
			
			return true;
		}
		
	}
	
	@PostMapping("/api/user/unblockcreditcard")
	public boolean UnblockCreditCard(@RequestBody BlockorUnBlockCard unblockcard)throws BadRequestException {
		Credit credit = cs.getDetailsBycardNo(unblockcard.getCardNo());
		//Credit credit = creditrepository.findByCardNo(unblockcard.getCardNo());
		System.out.println(unblockcard.getCardNo());
		if(credit == null) {
			throw new BadRequestException("Please enter the correct credit card number");
		}
		else if(!(credit.getCvv().equals(unblockcard.getCvv()) || credit.getPinNo().equals (unblockcard.getPinNo())))
			throw new BadRequestException("Invalid Pin or CVV");
		else if(credit.getStatus().equals("Active")) {
			throw new BadRequestException("Credit card with given card number is already active.");
		}
		else {
			credit.setStatus(unblockcard.getStatus());
			cs.addDetails(credit);
			//creditrepository.save(credit);
			
			emailService.sendVerificationEmailforUnBlockPin(credit.getEmailId(), credit.getCardNo());
			System.out.println("Mail Sent..");
			
			return true;
		}
	}
	
	

}
