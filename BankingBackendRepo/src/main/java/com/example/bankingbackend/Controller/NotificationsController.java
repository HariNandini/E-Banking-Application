package com.example.bankingbackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingbackend.Entity.Accounts;
import com.example.bankingbackend.Entity.Notifications;
import com.example.bankingbackend.Service.NotificationsService;
import com.example.bankingbackend.repository.NotificationsRepository;


@RestController
public class NotificationsController {

	@Autowired
	private NotificationsService notificationsService;
	
	
	
//	  @GetMapping("/api/user/notifications")
//	  public List<Notifications> getNotifications() {
//	    return notificationsRepository.findAll();
//	  }
	@GetMapping("/api/user/notifications/{emailId}")
	  public List<Notifications> getNotificationsbyemail(@PathVariable String emailId) {
	    List<Notifications> notifications = notificationsService.getnotificationsDetailsByEmailId(emailId);
	    return notifications;
	  }
	
	
}
