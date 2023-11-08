package com.example.bankingbackend.Service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import org.springframework.boot.test.context.SpringBootTest;

import com.example.bankingbackend.Entity.Debit;

import com.example.bankingbackend.repository.DebitRepository;

@SpringBootTest
class DebitServiceTest {

	@Mock
	private DebitRepository debitRepository;
	
	@InjectMocks
    DebitService debitservice=new DebitService();
	
	@Test
    void test_When_saveDebits_success() {


		Debit DebitReq=getMockUserInfo();
	 
		Debit DebitRes=getMockUserInfoRes();

	 	Mockito.when(debitRepository.save(Mockito.any(Debit.class))).thenReturn(DebitRes);

	 	debitservice.addDetails(DebitReq);
	 	//creditservice.addDetails(creditsReq);
        

        //System.out.println(acc);

        verify(debitRepository, times(1))
                .save(any());

        assertEquals(1, DebitRes.getId());
        assertEquals(DebitReq.getAccountNo(),DebitRes.getAccountNo());
    }
	private Debit getMockUserInfoRes() {
        return Debit.builder()
        		.id(1L)
                .accountNo(345123456L)
                .emailId("anulekhaachanta7@gamil.com")
                
                .build();
    }
	private Debit getMockUserInfo() {
        return Debit.builder()
        		.accountNo(3451234567L)
                .emailId("anulekhaachanta7@gamil.com")
                
                .build();
    }
}
