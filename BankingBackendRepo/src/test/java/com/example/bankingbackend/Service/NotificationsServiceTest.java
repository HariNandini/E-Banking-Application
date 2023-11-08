package com.example.bankingbackend.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.bankingbackend.Entity.Notifications;
import com.example.bankingbackend.repository.NotificationsRepository;
@SpringBootTest
class NotificationsServiceTest {

	@Mock
	private NotificationsRepository notificationsRepository;
	
	@InjectMocks
	NotificationsService notificationsservice=new NotificationsService();
	
	@Test
    void test_When_saveNotifications_success() {


		Notifications NotificationsReq=getMockNotifications();
	 
		Notifications NotificationsRes=getMockNotificationsRes();

	 	Mockito.when(notificationsRepository.save(Mockito.any(Notifications.class))).thenReturn(NotificationsRes);

	 	notificationsservice.saveAccounts(NotificationsReq);
	 	
	 	//creditservice.addDetails(creditsReq);
        

        //System.out.println(acc);

        verify(notificationsRepository, times(1))
                .save(any());

        assertEquals("anulekhaachanta7@gmail.com", NotificationsRes.getEmailId());
        assertEquals(NotificationsReq.getNotificationType(),NotificationsRes.getNotificationType());
    }
	
	private Notifications getMockNotificationsRes() {
        return Notifications.builder()
        		.emailId("anulekhaachanta7@gmail.com")
        		.notificationType("Debit Card")
                .build();
    }
	private Notifications getMockNotifications() {
        return Notifications.builder()
        		.notificationType("Debit Card")
            
                .build();
    }
}
