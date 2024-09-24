package com.hsi.lms.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
	
	private String message;
	private Boolean status;
	private String role;
	private String token;

}
