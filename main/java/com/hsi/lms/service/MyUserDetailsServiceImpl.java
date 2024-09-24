package com.hsi.lms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hsi.lms.dto.LoginDto;
import com.hsi.lms.entity.UserEntity;
import com.hsi.lms.repository.LoginRepository;

@Service
public class MyUserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	LoginRepository loginRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		UserEntity user = loginRepository.findByEmail(email);
		
		if(user == null) {
			System.out.println("User Not Found");
			throw new UsernameNotFoundException("User not found");
		}	
		
		return new LoginDto(user.getEmail(),user.getPassword());
	}

}
