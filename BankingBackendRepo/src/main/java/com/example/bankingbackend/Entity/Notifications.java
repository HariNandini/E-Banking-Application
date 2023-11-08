package com.example.bankingbackend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor

@Builder
@Table(name = "Notifications")
public class Notifications {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "email_id")
	private String emailId;
	@Column(name="notification_type")
	private String notificationType;
	@Column(name = "status")
	private String status;
	@Column(name = "card_no")
	private long cardNo;
	
	public Notifications() {

	}

	public Notifications(String emailId, String notificationType, String status,long cardNo) {
		super();
		this.emailId = emailId;
		this.notificationType = notificationType;
		this.status = status;
		this.cardNo=cardNo;
	}

	public synchronized Long getId() {
		return id;
	}

	public synchronized void setId(Long id) {
		this.id = id;
	}

	public synchronized String getEmailId() {
		return emailId;
	}

	public synchronized void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public synchronized String getNotificationType() {
		return notificationType;
	}

	public synchronized void setNotificationType(String notificationType) {
		this.notificationType = notificationType;
	}

	public synchronized String getStatus() {
		return status;
	}

	public synchronized void setStatus(String status) {
		this.status = status;
	}

	public synchronized long getCardNo() {
		return cardNo;
	}

	public synchronized void setCardNo(long cardNo) {
		this.cardNo = cardNo;
	}
	
	
	
}
