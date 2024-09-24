package com.hsi.lms.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.hsi.lms.dto.StudentDto;

public interface StudentService {

	List<StudentDto> getStudentsInCourse(Long courseId);
	
	List<StudentDto> getAllStudents();
	
	StudentDto updateStudent(Long studentId, StudentDto studentDto);
	
	void deleteStudent(Long studentId);
	
	StudentDto updateGrade(Long studentId, float grade);
	
	StudentDto enrollStudent(Long studentId, String course);

	List<String> getEmailIdOfStudentsInCourse(Long courseId);
	
	StudentDto findStudentByEmail(String email);
	
	StudentDto updateAssignmentFile(MultipartFile file, Long studentId);
	
	StudentDto getStudentById(Long studentId);
}
