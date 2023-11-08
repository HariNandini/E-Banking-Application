package com.example.bankingbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
public class BankingBackendApplication {
//	@Autowired
//	private EmailSenderService service;
	
	public static void main(String[] args) {
		SpringApplication.run(BankingBackendApplication.class, args);
	}
//
//	@EventListener(ApplicationReadyEvent.class)
//	public void triggerMail() throws MessagingException {
//		//service.sendSimpleEmail("sampathpavan.koppu@gmail.com","Hi sampath","THis is subject");
//		service.sendEmailwithAttachment("anulekhaachanta7@gmail.com","Hi this is banking","THis is subject","C:\\Users\\anulekha_achanta\\Downloads\\WhatsApp Image 2022-12-13 at 11.19.04 AM.jpg");
//		
//	}
}
