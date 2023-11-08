package com.example.bankingbackend.Service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.bankingbackend.Entity.Debit;
import com.example.bankingbackend.Entity.Loans;
import com.example.bankingbackend.repository.LoanRepository;

@SpringBootTest
class LoanServiceTest {

	@Mock
	private LoanRepository loanRepository;
	
	@InjectMocks
    LoanService loanservice=new LoanService();

	@Test
    void test_When_saveLoans_success() {


		Loans LoansReq=getMockLoans();
	 
		Loans LoansRes=getMockLoansRes();

	 	Mockito.when(loanRepository.save(Mockito.any(Loans.class))).thenReturn(LoansRes);

	 	loanservice.addDetails(LoansReq);
	 	//creditservice.addDetails(creditsReq);
        

        //System.out.println(acc);

        verify(loanRepository, times(1))
                .save(any());

        assertEquals(123L, LoansRes.getLoanId());
        assertEquals(LoansReq.getFirstName(),LoansRes.getFirstName());
    }
	private Loans getMockLoansRes() {
        return Loans.builder()
        		.loanId(123L)
        		.firstName("Anulekha")
                .lastName("Achanta")
                .build();
    }
	private Loans getMockLoans() {
        return Loans.builder()
        		.firstName("Anulekha")
                .lastName("Achanta")
                
                .build();
    }
}
