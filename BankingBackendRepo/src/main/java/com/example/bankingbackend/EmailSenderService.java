package com.example.bankingbackend;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
    private final JavaMailSender mailSender;

    public EmailSenderService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationEmail(String recipientEmail, String verificationLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Email Verification");
        message.setText("Please click the following link to verify your email address: " + verificationLink);
        mailSender.send(message);
    }
    public void sendVerificationEmailforsetpin(String recipientEmail, Long debitcardno,Long pinno) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Debit Card Set/Reset Pin");
        message.setText("You have performed set/reset pin for ur debitcard of number: " + debitcardno + " with new pin no: "+pinno);
        mailSender.send(message);
    }
    public void sendVerificationEmailforBlockPin(String recipientEmail, Long debitcardno) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Debit Card Blocked");
        message.setText("You have Blocked the debit card of number " + debitcardno );
        mailSender.send(message);
    }

	public void sendVerificationEmailforsupport(String name, String email, String msg) {
		// TODO Auto-generated method stub
		SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("anulekhaachanta7@gmail.com");
        message.setSubject("Support team Q/A");
        message.setText("A person named "+name+" of mail "+email+" has this query "+msg);
        mailSender.send(message);
		
	}
	
	public void sendVerificationEmailforUnBlockPin(String recipientEmail, Long debitcardno) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Debit Card UnBlocked");
        message.setText("You have UnBlocked the debit card of number " + debitcardno );
        mailSender.send(message);
    }

	public void sendforgetpasswordEmail(String emailId, String verificationLink) {
		// TODO Auto-generated method stub
		SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailId);
        message.setSubject("Email Verification");
        message.setText("Please click the following link to Reset password: " + verificationLink);
        mailSender.send(message);
		
	}

}