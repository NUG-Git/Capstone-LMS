package com.hsi.lms;

import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertNotNull;

import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hsi.lms.dto.CourseDto;
import com.hsi.lms.dto.UserEntityDto;
import com.hsi.lms.entity.Course;
import com.hsi.lms.entity.UserEntity;
import com.hsi.lms.repository.LoginRepository;
import com.hsi.lms.service.AdminServiceImpl;
import com.hsi.lms.service.LoginServiceImpl;
import com.hsi.lms.utils.RoleType;

@SpringBootTest
class LmsApplicationTests {
	
	@Autowired
	LoginServiceImpl loginServiceImpl;
	
	@Autowired
	LoginRepository loginRepository;
	
	@Autowired
	AdminServiceImpl adminServiceImpl;
	


	// Register new ADMIN user
	@Test
	void createAdminUser() {
		UserEntityDto userDto = new UserEntityDto();
		userDto.setEmail("roopa@gmail.com");
		userDto.setPassword("roopa");
		userDto.setRole(RoleType.ADMIN);
		userDto.setUserName("Roopa");
		loginServiceImpl.createUser(userDto);
		
		UserEntity savedUser = loginRepository.findByEmail("roopa@gmail.com");
		assertNotNull(savedUser);		
	}
	
	//Register new INSTRUCTOR user
	@Test
	void createInstructorUser() {
		UserEntityDto userDto = new UserEntityDto();
		userDto.setEmail("rajesh@gmail.com");
		userDto.setPassword("rajesh");
		userDto.setRole(RoleType.INSTRUCTOR);
		userDto.setUserName("Rajesh");
		loginServiceImpl.createUser(userDto);
		
		UserEntity savedUser = loginRepository.findByEmail("rajesh@gmail.com");
		assertNotNull(savedUser);		
	}
	
	//Register new STUDENT user
	@Test
	void createStudentUser() {
		UserEntityDto userDto = new UserEntityDto();
		userDto.setEmail("rithika@gmail.com");
		userDto.setPassword("rithika");
		userDto.setRole(RoleType.STUDENT);
		userDto.setUserName("Rithika");
		loginServiceImpl.createUser(userDto);
		
		UserEntity savedUser = loginRepository.findByEmail("rithika@gmail.com");
		assertNotNull(savedUser);	
	}
	
	@Test
	void createCourse() {
		CourseDto courseDto = new CourseDto();
		courseDto.setCourseName("Data Mining");
		courseDto.setDuration(11);
		CourseDto savedCourse = adminServiceImpl.createCourse(courseDto);
		
		assertNotNull(adminServiceImpl.getCourseById(savedCourse.getCourseId()));
		
	}
	
	

}
