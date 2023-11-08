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


import com.example.bankingbackend.Entity.UserInfo;
import com.example.bankingbackend.repository.UserInfoRepository;

@SpringBootTest
class UserInfoServiceTest {

	@Mock
	private UserInfoRepository userInfoRepository;
	
	@InjectMocks
    UserInfoService userInfoservice=new UserInfoService();
	@Test
    void test_When_savecredits_success() {


	 UserInfo UserInfoReq=getMockUserInfo();
	 
	 UserInfo UserInfoRes=getMockUserInfoRes();

	 	Mockito.when(userInfoRepository.save(Mockito.any(UserInfo.class))).thenReturn(UserInfoRes);

	 	userInfoservice.addDetails(UserInfoReq);
	 	//creditservice.addDetails(creditsReq);
        

        //System.out.println(acc);

        verify(userInfoRepository, times(1))
                .save(any());

        assertEquals(1, UserInfoRes.getId());
        assertEquals("A123",UserInfoRes.getCustomerId());
    }
	private UserInfo getMockUserInfoRes() {
        return UserInfo.builder()
        		.id(1L)
                .customerId("A1234")
                .emailId("anulekhaachanta7@gamil.com")
                
                .build();
    }
	private UserInfo getMockUserInfo() {
        return UserInfo.builder()
        		.customerId("A1234")
                .emailId("anulekhaachanta7@gamil.com")
                
                .build();
    }
}
