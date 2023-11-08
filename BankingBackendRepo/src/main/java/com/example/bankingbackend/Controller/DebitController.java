package com.example.bankingbackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingbackend.EmailSenderService;
import com.example.bankingbackend.Entity.BlockorUnBlockCard;
import com.example.bankingbackend.Entity.Debit;
import com.example.bankingbackend.Entity.Notifications;
import com.example.bankingbackend.Entity.setresetPin;
import com.example.bankingbackend.Exception.BadRequestException;
import com.example.bankingbackend.Exception.ResourceNotFoundException;
import com.example.bankingbackend.Exception.ValidationException;
import com.example.bankingbackend.Service.AccountService;
import com.example.bankingbackend.Service.DebitService;
import com.example.bankingbackend.Service.NotificationsService;

@RestController
public class DebitController {

//	@Autowired
//	private DebitRepository debitRepository;

	@Autowired
	private DebitService debitService;
	
	@Autowired
	private AccountService accountService;
	
	@Autowired
	private NotificationsService notificationsService;
	
	private final EmailSenderService emailService;
	
//	@Autowired
//	public TransactionHistoryService transactionHistoryService; 

	public DebitController(EmailSenderService emailService) {
		this.emailService = emailService;
	}

	@GetMapping("/api/admindashboard/DebitapprovalsHistory")
	public List<Debit> DebitapprovalsHistory() {
		List<Debit> dh =debitService.getDetailsbyStatus("Waiting for approval");
		//List<Debit> dh = debitRepository.findByStatus("Waiting for approval");
		System.out.println(dh);
		return dh;
	}

	@GetMapping("/api/admindashboard/DebitapprovedHistory")
	public List<Debit> DebitapprovedHistory() {
		List<Debit> dh1 =debitService.getDetailsbyStatus("Approved");
		List<Debit> dh2 =debitService.getDetailsbyStatus("Active");
		List<Debit> dh3 =debitService.getDetailsbyStatus("Block");
		//List<Debit> dh1 = debitRepository.findByStatus("Approved");
		//List<Debit> dh2 = debitRepository.findByStatus("Active");
		dh1.addAll(dh2);
		dh1.addAll(dh3);
		System.out.println(dh1);
		return dh1;
	}
	
	@PostMapping("/api/admindashboard/updatestatus")
	public boolean updatestatustoapprove(@RequestBody Debit debit) {
		Debit da =debitService.getDebitDetails(debit.getCardNo());

		System.out.println(debit.getCardNo() + " " + da.getStatus());
		Notifications n=new Notifications();
		n.setEmailId(debit.getEmailId());
		n.setCardNo(debit.getCardNo());
		n.setNotificationType("Debit Card");
		n.setStatus("Approved");
		notificationsService.saveAccounts(n);
			da.setStatus("Approved");
			debitService.addDetails(da);
//			debitRepository.save(da);
			return true;

	}

	//	@PostMapping("/api/admindashboard/updatestatus/{cardNo}")
//	public boolean updatestatustoapprove(@PathVariable Long cardNo) {
//		Debit da =debitService.getDebitDetails(cardNo);
//		//Debit da = debitRepository.findByCardNo(cardNo);
//		System.out.println(cardNo + " " + da.getStatus());
//		
////		Notifications n=notificationsService.getnotificationsDetails(da.getCardNo(),"Debit Card");
////		
////		n.setStatus("Approved");
////		notificationsService.saveAccounts(n);
//		
//			da.setStatus("Approved");
//			debitService.addDetails(da);
////			debitRepository.save(da);
//			return true;
//
//	}

	@PostMapping("/api/user/accountnocheck/{accountNo}")
	public boolean accNoCheck(@PathVariable Long accountNo) {

		return debitService.checkDebitExistsWithAccNo(accountNo);
		
	}

	// applying for a new card
	@PostMapping("/api/user/applydebitcard") 
	public boolean saveDebit(@RequestBody Debit debit) throws ValidationException{
		Long accountno = debit.getAccountNo();
		System.out.println(debit.getStatus());
		Debit d= debitService.getDebitDetailsByAccNo(accountno);
		//Debit d = debitRepository.findByAccountNo(accountno);
		System.out.println(accountno + " " + d);
		if (d == null) {
			
//			Notifications n=new Notifications();
//			n.setEmailId(debit.getEmailId());
//			n.setCardNo(debit.getCardNo());
//			n.setNotificationType("Debit Card");
//			n.setStatus("Waiting for approval");
//			notificationsService.saveAccounts(n);
			debitService.addDetails(debit);
//			debitRepository.save(debit);
			return true;
		} else {
			System.out.println("Customer already exists");
			//return false;
			throw new ValidationException("Customer already exists");
		}
	}

	// set a pin
	@PostMapping("/api/user/setorresetpin")
	public boolean setPin(@RequestBody setresetPin setpin) throws ValidationException{
		Debit debit=debitService.getDebitDetails(setpin.getCardNo());
		//Debit debit = debitRepository.findByCardNo(setpin.getCardNo());
		System.out.println(setpin.getPinNo() + "-" + debit.getStatus() + "-");
		if (debit == null ){
			System.out.println(setpin.getPinNo() + " " + debit.getStatus());
			//return false;
			throw new ValidationException("Waiting for approval");
		} else {
			System.out.println(debit.getPinNo());
//			if(debit.getPinNo()==null) {
//				Notifications n=notificationsService.getnotificationsDetails(debit.getCardNo(),"Debit Card");
//				notificationsService.deleteAccounts(n);
//			}
			
			debit.setPinNo(setpin.getPinNo());
			debit.setStatus(setpin.getStatus());
			System.out.println(debit.getPinNo() + " " + debit.getStatus());
			debitService.addDetails(debit);
			//debitRepository.save(debit);
			emailService.sendVerificationEmailforsetpin(debit.getEmailId(), debit.getCardNo(), debit.getPinNo());
			System.out.println("Mail Sent..");
			return true;
		}
	}

	// blocking a debitCard
	@PostMapping("/api/user/blockcard")
	public boolean blockDebitCard(@RequestBody BlockorUnBlockCard blockcard) throws BadRequestException, ResourceNotFoundException{
		Debit debit=debitService.getDebitDetails(blockcard.getCardNo());
		//Debit debit = debitRepository.findByCardNo(blockcard.getCardNo());
		System.out.println(blockcard.getCardNo());
		if (debit == null) {
			throw new BadRequestException("Debit card with given card number doesn't exists");
		} 
		if(!debit.getStatus().equals("Active"))
		{
			throw new ResourceNotFoundException("Please activate your debit card");
		}
		 if(!debit.getCvv().equals(blockcard.getCvv()) || !debit.getPinNo().equals(blockcard.getPinNo()))
			throw new BadRequestException("Invalid Pin or CVV");
		else if(!debit.getStatus().equals("Active")) {
			throw new BadRequestException("Debit card with given card number is already blocked");
		}
		else {
//			Notifications n=notificationsService.getnotificationsDetails(debit.getCardNo(),"Debit Card");
//			
//			
//			n.setStatus("Block");
//			notificationsService.saveAccounts(n);
			debit.setStatus(blockcard.getStatus());
			debitService.addDetails(debit);
			//debitRepository.save(debit);
			
			emailService.sendVerificationEmailforBlockPin(debit.getEmailId(), debit.getCardNo());
			System.out.println("Mail Send..");

			return true;
		}
	}

	@PostMapping("/api/user/Unblockcard")

	public boolean UnblockDebitCard(@RequestBody BlockorUnBlockCard Unblockcard) throws BadRequestException, ResourceNotFoundException{
		Debit debit=debitService.getDebitDetails(Unblockcard.getCardNo());
		//Debit debit = debitRepository.findByCardNo(Unblockcard.getCardNo());
		System.out.println(Unblockcard.getCardNo());

		if (debit == null) {
			//return false;
			throw new BadRequestException("Debit card number must not be null please, enter the correct Debit card number");
		}
//		else if(!debit.getStatus().equals("Active"))
//		{
//			throw new ResourceNotFoundException("Please activate your debit card");
//		}
		else if(debit.getStatus().equals("Active")) {
			throw new BadRequestException("Debit card with given card number is already Active");}
		else if(!debit.getCvv().equals(Unblockcard.getCvv()) || !debit.getPinNo().equals(Unblockcard.getPinNo()))
			throw new BadRequestException("Invalid Pin or CVV");
		
		else {
//			Notifications n=notificationsService.getnotificationsDetails(debit.getCardNo(),"Debit Card");
//			
//			n.setStatus("Active");
//			notificationsService.saveAccounts(n);
			debit.setStatus(Unblockcard.getStatus());
			debitService.addDetails(debit);
			//debitRepository.save(debit);

			emailService.sendVerificationEmailforUnBlockPin(debit.getEmailId(), debit.getCardNo());
			System.out.println("Mail Send..");

			return true;

		}
	}

}