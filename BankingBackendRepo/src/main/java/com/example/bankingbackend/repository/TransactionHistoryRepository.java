package com.example.bankingbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bankingbackend.Entity.TransactionHistory;

@Repository
public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory,Long>{
	List<TransactionHistory> findByAccountNo(Long accountNo);
}
