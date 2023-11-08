package com.example.bankingbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bankingbackend.Entity.Notifications;



@Repository
public interface NotificationsRepository extends JpaRepository<Notifications,Long>{

//	Notifications findByEmailId(String string);

	Notifications findByCardNoAndNotificationType(long cardNo, String notificationType);

	List<Notifications> findByEmailId(String emailId);

	

}
