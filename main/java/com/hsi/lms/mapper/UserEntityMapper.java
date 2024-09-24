package com.hsi.lms.mapper;

import com.hsi.lms.dto.UserEntityDto;
import com.hsi.lms.entity.UserEntity;

public class UserEntityMapper {
	
	public static UserEntityDto mapToUserEntityDto(UserEntity user) {
		
		UserEntityDto userDto = new UserEntityDto(user.getUserId(), 
				user.getUserName(),user.getPassword(),user.getEmail(), user.getRole(), "");
		
		return userDto;
	}
	
	public static UserEntity mapToUserEntity(UserEntityDto userDto) {
		UserEntity user = new UserEntity(userDto.getUserId(), userDto.getUserName(), userDto.getPassword(),
				userDto.getEmail(), userDto.getRole());
		
		return user;
	}

}
