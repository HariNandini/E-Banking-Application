package com.example.bankingbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankingbackend.Entity.Credit;

public interface CreditRepository extends JpaRepository<Credit, Long>{

	Credit findByAccountNo(Long accountNo);

	List<Credit> findByStatus(String string);

	Credit findByCardNo(long cardNo);

}
