package com.example.bankingbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankingbackend.Entity.Debit;

public interface DebitRepository extends JpaRepository<Debit, Long> {

	Debit findByCardNo(Long cardNo);
	Debit findByAccountNo(Long accountNo);
	List<Debit> findByStatus(String string);
	

}
