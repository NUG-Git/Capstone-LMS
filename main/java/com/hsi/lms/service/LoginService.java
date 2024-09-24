package com.hsi.lms.service;

import com.hsi.lms.dto.UserEntityDto;
import com.hsi.lms.response.LoginResponse;

public interface LoginService {
	
	UserEntityDto createUser(UserEntityDto userDto);
	
	LoginResponse loginUser(UserEntityDto userDto);

}
