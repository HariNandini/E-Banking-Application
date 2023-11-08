package com.example.bankingbackend.Security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.example.bankingbackend.Entity.UserInfo;
import com.example.bankingbackend.repository.UserInfoRepository;

@Component
public class UserInfoDetailsService implements UserDetailsService {

	@Autowired
	private UserInfoRepository userRepository;

	@Override

	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<UserInfo> userOptional = userRepository.findByEmailId(email);
		return userOptional.map(UserInfoDetails::new)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

	}
}