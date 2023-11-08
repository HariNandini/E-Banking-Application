package com.example.bankingbackend.Entity;

public class setresetPin {
	private long cardNo;
	private Long pinNo;
	private String status;
	public synchronized long getCardNo() {
		return cardNo;
	}
	public synchronized void setCardNo(long cardNo) {
		this.cardNo = cardNo;
	}
	public synchronized Long getPinNo() {
		return pinNo;
	}
	public synchronized void setPinNo(Long pinNo) {
		this.pinNo = pinNo;
	}
	public synchronized String getStatus() {
		return status;
	}
	public synchronized void setStatus(String status) {
		this.status = status;
	}

	
}
