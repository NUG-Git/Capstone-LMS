package com.hsi.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.hsi.lms.dto.StudentDto;
import com.hsi.lms.dto.UserEntityDto;
import com.hsi.lms.response.AssignmentResponse;
import com.hsi.lms.service.StudentService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@ComponentScan("com.hsi.lms.service")
public class StudentController {
	
	@Autowired
	private StudentService studentService;
	
	// Get all students in a given course
	@GetMapping("/instructor/getStudentsInCourse/{id}")
	public ResponseEntity<List<StudentDto>> getStudentsInCourse(@PathVariable("id") Long courseId) {
		System.out.println("...In controller..."+courseId);
		List<StudentDto> fetchedStudents = studentService.getStudentsInCourse(courseId);
		return ResponseEntity.ok(fetchedStudents);
	}
	
	//Get all students 
	@GetMapping("/instructor/getAllStudents")
	public ResponseEntity<List<StudentDto>> getAllStudents(){
		List<StudentDto> fetchedStudents = studentService.getAllStudents();
		return ResponseEntity.ok(fetchedStudents);
	}
	
	// Save student grade
	@PutMapping("/instructor/updateGrade/{studentId},{grade}")
	public ResponseEntity<StudentDto> updateGrade(@PathVariable("studentId") Long studentId, @PathVariable("grade") float grade) {
		
		
	
		StudentDto updatedStudent = studentService.updateGrade(studentId,grade);
		
		return ResponseEntity.ok(updatedStudent);
	}
	
	@PutMapping("/enrollStudent/{studentId},{course}")
	public ResponseEntity<StudentDto> enrollStudent(@PathVariable("studentId") Long studentId, @PathVariable("course") String course) {
		
		System.out.println(studentId+"..."+course);
	
		StudentDto updatedStudent = studentService.enrollStudent(studentId,course);
		
		return ResponseEntity.ok(updatedStudent);
	}
	 
	@PostMapping("/findStudent")
	public ResponseEntity<StudentDto> findStudentByEmail(@RequestBody UserEntityDto userDto){
		
		StudentDto fetchedStudent = studentService.findStudentByEmail(userDto.getEmail());
		
		return ResponseEntity.ok(fetchedStudent);
	}
	
	@PostMapping("/uploadStudentFile/{studentId}")
	public ResponseEntity<AssignmentResponse> uploadAssignmentFile(@RequestParam("file") MultipartFile file, @PathVariable Long studentId) throws Exception{
		
		StudentDto updatedStudent = null;
		
		updatedStudent = studentService.updateAssignmentFile(file,studentId);
	
		
		AssignmentResponse response = new AssignmentResponse();
		
		response.setFileName(updatedStudent.getFileName());
		response.setFileSize(file.getSize());
		response.setFileType(updatedStudent.getFileType());
		response.setId(updatedStudent.getStudentId());
		String studentIdString = updatedStudent.getStudentId().toString();
		String downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/").path(studentIdString).toUriString();
		response.setDownloadURL(downloadURL);
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/downloadStudentFile/{studentId}")
	public ResponseEntity<Resource> downloadAssignmentFile(@PathVariable Long studentId){
		
		StudentDto fetchedStudent = studentService.getStudentById(studentId);
		byte[]	data = fetchedStudent.getData();
		
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(fetchedStudent.getFileType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment: filename=\""+fetchedStudent.getFileName()+"\"")
				.body(new ByteArrayResource(data));
		
	}
	
	
	
	
}

