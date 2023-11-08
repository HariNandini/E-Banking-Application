package com.example.bankingbackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bankingbackend.Entity.UserInfo;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {

	UserInfo findByCustomerId(String customeridref);

	UserInfo findByCustomerIdOrEmailId(String customerId, String emailId);

	Optional<UserInfo> findByEmailId(String email);

}
