package com.hsi.lms.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.hsi.lms.dto.CourseDto;
import com.hsi.lms.dto.InstructorDto;
import com.hsi.lms.dto.ReportDto;
import com.hsi.lms.dto.StudentDto;
import com.hsi.lms.response.AssignmentResponse;
import com.hsi.lms.service.AdminService;
import com.hsi.lms.service.InstructorService;
import com.hsi.lms.service.StudentService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@ComponentScan("com.hsi.lms.service")
public class AdminController {
	
	@Autowired
	private  AdminService  adminService;
	
	@Autowired
	private  InstructorService  instructorService;
	
	@Autowired
	private StudentService studentService;
	
	
	//Get all instructors 
	@GetMapping("/getAllInstructors")
	public ResponseEntity<List<InstructorDto>> getAllInstructors() {
		
		List<InstructorDto> fetchedInstructors = instructorService.getAllInstructors();
		
		return ResponseEntity.ok(fetchedInstructors);
	} 
	
	// Delete Instructor REST API
	@DeleteMapping("/deleteInstructor/{id}")
	public ResponseEntity<String> deleteInstructor(@PathVariable("id") Long instructorId) {
		
		instructorService.deleteInstructor(instructorId);
		
		return ResponseEntity.ok("Instructor deleted successfully");
	}	
	
	//Update Instructor Details
	@PutMapping("/updateInstructor/{id}")
	public ResponseEntity<InstructorDto> updateInstructor(@PathVariable("id") Long instructorId, @RequestBody() InstructorDto instructorDto){
		
		InstructorDto updatedInstructor = instructorService.updateInstructor(instructorId,instructorDto);
		
		return ResponseEntity.ok(updatedInstructor);
	}
	
	//Update Student Details
	@PutMapping("/updateStudent/{id}")
	public ResponseEntity<StudentDto> updateStudent(@PathVariable("id") Long studentId, @RequestBody() StudentDto studentDto){
		
		StudentDto updatedStudent = studentService.updateStudent(studentId,studentDto);
		
		return ResponseEntity.ok(updatedStudent);
	}
	
	// Delete Student REST API
	@DeleteMapping("/deleteStudent/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable("id") Long studentId) {
		
		studentService.deleteStudent(studentId);
		
		return ResponseEntity.ok("Student deleted successfully");
	}	
		
	
	// Create Course REST API
	@PostMapping(value="/createCourse")
	public ResponseEntity<CourseDto> createCourse(@RequestBody CourseDto courseDto) {
		
		CourseDto savedCourse = adminService.createCourse(courseDto);
		
		return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);
	}
	
	// Get Course by id REST API
	@GetMapping("/getCourse/{id}")
	public ResponseEntity<CourseDto> getCourseById(@PathVariable("id") Long courseId){
		
		CourseDto fetchedCourse = adminService.getCourseById(courseId);
		
		return ResponseEntity.ok(fetchedCourse);
	}
	
	// Get all courses REST API
	@GetMapping("/getAllCourses")
	public ResponseEntity<List<CourseDto>> getAllCourses() {
		
		List<CourseDto> fetchedCourses = adminService.getAllCourse();
		
		return ResponseEntity.ok(fetchedCourses);
	}
	
	// Update Course REST API
	@PutMapping("/updateCourse/{id}")
	public ResponseEntity<CourseDto> updateCourse(@PathVariable("id") Long courseId,@RequestBody CourseDto courseDto){
		
		CourseDto updatedCourse = adminService.updateCourse(courseId, courseDto);
		
		return ResponseEntity.ok(updatedCourse);
	}
	
	// Delete Course REST API
	@DeleteMapping("/deleteCourse/{id}")
	public ResponseEntity<String> deleteCourse(@PathVariable("id") Long courseId) {
		
		adminService.deleteCourse(courseId);
		
		return ResponseEntity.ok("Course deleted successfully");
	}	
	
	// Get all course names for enrollment purpose
	@GetMapping("/getCourseNames")
	public ResponseEntity<List<String>> getCourseNames(){
		List<String> courseList = adminService.getCourseNames();
				
				return ResponseEntity.ok(courseList);
	}
	
	@PostMapping("/uploadFile/{courseId}")
	public ResponseEntity<AssignmentResponse> uploadAssignmentFile(@RequestParam("file") MultipartFile file, @PathVariable Long courseId) throws Exception{
		
		System.out.println("inside upload  method");
		CourseDto updatedCourse = null;
		
		updatedCourse = adminService.updateAssignmentFile(file,courseId);
	
		
		
		
		AssignmentResponse response = new AssignmentResponse();
		
		response.setFileName(updatedCourse.getAssignmentFileName());
		response.setFileSize(file.getSize());
		response.setFileType(updatedCourse.getFileType());
		response.setId(updatedCourse.getCourseId());
		String courseIdString = updatedCourse.getCourseId().toString();
		String downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/").path(courseIdString).toUriString();
		response.setDownloadURL(downloadURL);
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/downloadFile/{courseId}")
	public ResponseEntity<Resource> downloadAssignmentFile(@PathVariable Long courseId){
		
		CourseDto fetchedCourse = adminService.getCourseById(courseId);
		
		int length = 0;
		byte[] data=null;
		try {
			length = (int)fetchedCourse.getData().length();
			data = fetchedCourse.getData().getBytes(1, length);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(fetchedCourse.getFileType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment: filename=\""+fetchedCourse.getAssignmentFileName()+"\"")
				.body(new ByteArrayResource(data));
		
	}
	
	@GetMapping("/report")
	public ResponseEntity<List<ReportDto>> getStudentCourseReport() {
		List<ReportDto> reports = adminService.getCourseStudentReport();
		System.out.println(reports);
		
		return ResponseEntity.ok(reports);
		
	}
	
	
	
	

}
