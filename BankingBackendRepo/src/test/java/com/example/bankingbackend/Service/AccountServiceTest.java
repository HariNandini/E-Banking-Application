package com.example.bankingbackend.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.bankingbackend.Entity.Accounts;
import com.example.bankingbackend.repository.AccountsRepository;

@SpringBootTest
class AccountServiceTest {

	@Mock
	private AccountsRepository accountsRepository;
	
	@InjectMocks
    AccountService accountservice=new AccountService();
	
	@Test
    void test_When_saveaccounts_success() {


	 Accounts accountsReq=getMockAccounts();
	 Accounts accountsRes=getMockAccountsRes();

	 	Mockito.when(accountsRepository.save(Mockito.any(Accounts.class))).thenReturn(accountsRes);


        Accounts acc =  accountservice.addAccounts(accountsReq);

        System.out.println(acc);

        verify(accountsRepository, times(1))
                .save(any());

        assertEquals(1, accountsRes.getId());
        assertEquals(123L,accountsRes.getAccountNo());
  }
	private Accounts getMockAccountsRes() {
        return Accounts.builder()
        		.id(1L)
                .accountNo(3451234567L)
                .emailId("anulekhaachanta7@gamil.com")
                .status("Active")
                .build();
    }
	
	
	private Accounts getMockAccounts() {
        return Accounts.builder()
                .accountNo(3451234567L)
                .emailId("anulekhaachanta7@gamil.com")
                .status("Active")
                .build();
        
    }
}

