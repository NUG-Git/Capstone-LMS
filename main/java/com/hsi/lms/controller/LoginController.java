package com.hsi.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hsi.lms.dto.UserEntityDto;
import com.hsi.lms.response.LoginResponse;
import com.hsi.lms.service.LoginService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@ComponentScan("com.hsi.lms.service")
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@PostMapping("/register")
	public ResponseEntity<UserEntityDto> createUser(@RequestBody UserEntityDto userDto) {
		
		UserEntityDto savedUser = loginService.createUser(userDto);
		return new ResponseEntity<>(savedUser,HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> loginUser(@RequestBody UserEntityDto userDto) {
		
		LoginResponse loginResponse = loginService.loginUser(userDto);
		
		System.out.println(loginResponse.getMessage()+"...."+loginResponse.getRole());
		
		
		return ResponseEntity.ok(loginResponse);
	}
	
	
	

}
