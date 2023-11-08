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

import com.example.bankingbackend.Entity.TransactionHistory;
import com.example.bankingbackend.repository.TransactionHistoryRepository;

@SpringBootTest
class TransactionHistoryServiceTest {

	@Mock
	private TransactionHistoryRepository transactionHistoryRepo;
	
	@InjectMocks
	TransactionHistoryService transactionHistoryservice=new TransactionHistoryService();

	@Test
    void test_When_saveTransactionHistory_success() {


		TransactionHistory TransactionHistoryReq=getMockTransactionHistory();
		
		TransactionHistory TransactionHistoryRes=getMockTransactionHistoryRes();

	 	Mockito.when(transactionHistoryRepo.save(Mockito.any(TransactionHistory.class))).thenReturn(TransactionHistoryRes);

	 	transactionHistoryservice.addTransactionHistory(TransactionHistoryRes);
	 	//creditservice.addDetails(creditsReq);
        

        //System.out.println(acc);

        verify(transactionHistoryRepo, times(1))
                .save(any());

        assertEquals(123L, TransactionHistoryRes.getTransaction_id());
        assertEquals(TransactionHistoryReq.getTransactionType(),TransactionHistoryRes.getTransactionType());
    }
	private TransactionHistory getMockTransactionHistoryRes() {
        return TransactionHistory.builder()
        		.transaction_id(123L)
        		.transactionType("withdraw")
                .build();
    }
	private TransactionHistory getMockTransactionHistory() {
        return TransactionHistory.builder()
        		.transactionType("withdraw")
                
                .build();
    }

}
