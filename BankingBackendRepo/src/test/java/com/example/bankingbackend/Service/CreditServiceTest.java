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

import com.example.bankingbackend.Entity.Accounts;
import com.example.bankingbackend.Entity.Credit;
import com.example.bankingbackend.repository.CreditRepository;

@SpringBootTest
class CreditServiceTest {

	@Mock
    private CreditRepository creditRepository;
	
	@InjectMocks
    CreditService creditservice=new CreditService();

	@Test
    void test_When_savecredits_success() {


	 Credit creditsReq=getMockCredits();
	 
	 Credit creditsRes=getMockCreditsRes();

	 	Mockito.when(creditRepository.save(Mockito.any(Credit.class))).thenReturn(creditsRes);

	 	creditservice.addDetails(creditsReq);
        

        //System.out.println(acc);

        verify(creditRepository, times(1))
                .save(any());

        assertEquals(1, creditsRes.getId());
        assertEquals(3451234567L,creditsRes.getAccountNo());
    }
	private Credit getMockCreditsRes() {
        return Credit.builder()
        		.id(1L)
                .accountNo(3451234567L)
                .emailId("anulekhaachanta7@gamil.com")
                .status("Active")
                .build();
    }
	private Credit getMockCredits() {
        return Credit.builder()
                .accountNo(3451234567L)
                .emailId("anulekhaachanta7@gamil.com")
                .status("Active")
                .build();
    }
}
