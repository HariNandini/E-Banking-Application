package com.example.bankingbackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingbackend.Entity.UserInfo;
import com.example.bankingbackend.repository.UserInfoRepository;

@Service
public class UserInfoService {

	@Autowired
	private UserInfoRepository userInfoRepository;

	public UserInfo getdetailsbycustid(String customerId) {
		// TODO Auto-generated method stub
		return userInfoRepository.findByCustomerId(customerId);
	}

	public void addDetails(UserInfo user) {
		// TODO Auto-generated method stub
		userInfoRepository.save(user);
	}
	
}
