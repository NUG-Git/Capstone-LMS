package com.hsi.lms.dto;

import com.hsi.lms.utils.RoleType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntityDto {
	
	private Long userId;
	
	private String userName;
	
	private String password;
	
	private String email;
	
	private RoleType role;
	
	private String enrolledCourse;

}
