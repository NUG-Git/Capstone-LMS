package com.hsi.lms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hsi.lms.config.SecurityConfig;
import com.hsi.lms.dto.LoginDto;
import com.hsi.lms.dto.UserEntityDto;
import com.hsi.lms.entity.Admin;
import com.hsi.lms.entity.Course;
import com.hsi.lms.entity.Instructor;
import com.hsi.lms.entity.Student;
import com.hsi.lms.entity.UserEntity;
import com.hsi.lms.mapper.UserEntityMapper;
import com.hsi.lms.repository.AdminRepository;
import com.hsi.lms.repository.CourseRepository;
import com.hsi.lms.repository.InstructorRepository;
import com.hsi.lms.repository.LoginRepository;
import com.hsi.lms.repository.StudentRepository;
import com.hsi.lms.response.LoginResponse;
import com.hsi.lms.utils.RoleType;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
@NoArgsConstructor
@ComponentScan("com.hsi.lms.repository")
public class LoginServiceImpl implements LoginService{
	
	@Autowired
	private LoginRepository loginRepository;
	
	@Autowired
	private AdminRepository adminRepository;
	
	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private InstructorRepository instructorRepository;
	
	@Autowired
	private CourseRepository courseRepository;
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private JWTServiceImpl jwtService;
	
	@Override
	public UserEntityDto createUser(UserEntityDto userDto) {
		
		String encryptedPwd = new BCryptPasswordEncoder().encode(userDto.getPassword());	
		userDto.setPassword(encryptedPwd);
		
		UserEntity user = UserEntityMapper.mapToUserEntity(userDto);
		
		UserEntity savedUser = loginRepository.save(user);
		
		
		//create an entry in student table if the new user is a student
		if(userDto.getRole().equals(RoleType.STUDENT)) {
			Student student = new Student();
			student.setStudentName(userDto.getUserName());
			student.setEmail(userDto.getEmail());
			student.setCourseName(userDto.getEnrolledCourse());
			
			// getting courseId of the enrolled course
			List<Course> courses = courseRepository.findAll();
			Long enrolledCourseId = 0L;
			
			for(Course course : courses) {
				if(course.getCourseName().equalsIgnoreCase(userDto.getEnrolledCourse())) {
					enrolledCourseId = course.getCourseId();
				}
			}
			student.setCourseId(enrolledCourseId);
			
			studentRepository.save(student);
			
		}
		
		//create an entry in the admin table if the new user is an admin
		if(userDto.getRole().equals(RoleType.ADMIN)) {
			Admin admin = new Admin();
			admin.setAdminName(userDto.getUserName());
			admin.setEmail(userDto.getEmail());
			adminRepository.save(admin);
		}
		
		
		//create an entry in the instructor table if the new user is an instructor
		if(userDto.getRole().equals(RoleType.INSTRUCTOR)) {
			Instructor instructor = new Instructor();
			instructor.setInstructorName(userDto.getUserName());
			instructor.setEmail(userDto.getEmail());
			instructorRepository.save(instructor);
		}
		
		
		return (UserEntityMapper.mapToUserEntityDto(savedUser));
	}

	/*
	 * @Override public LoginResponse loginUser(UserEntityDto userDto) {
	 * 
	 * UserEntity user = loginRepository.findByEmail(userDto.getEmail());
	 * System.out.println(user.getEmail()); System.out.println(user.getPassword());
	 * 
	 * if(user!=null) {
	 * 
	 * if(passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
	 * Optional<UserEntity> userEntity =
	 * loginRepository.findOneByEmailAndPassword(userDto.getEmail(),
	 * user.getPassword()); if(userEntity.isPresent()) { return(new
	 * LoginResponse("Login Successful",true,user.getRole().toString())); }else {
	 * return(new LoginResponse("Login failed",false,"")); } }else { return(new
	 * LoginResponse("Incorrect Password", false, "")); }
	 * 
	 * } else { return new LoginResponse("User does not exist", false,""); }
	 * 
	 * }
	 */
	
	@Override 
	public LoginResponse loginUser(UserEntityDto userDto) {
		
		Authentication authentication = 
				authManager.authenticate(new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPassword()));
		String token="";
		if(authentication.isAuthenticated()) {
			token = jwtService.generateToken(userDto.getEmail());
			
			UserEntity user = loginRepository.findByEmail(userDto.getEmail());
			
			return(new LoginResponse("Login Successful",true,user.getRole().toString(),token)); 
		}
		
		return(new LoginResponse("Login failed",false,"",token)); 
			
	}

}
