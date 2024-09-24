package com.hsi.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.hsi.lms.service.EmailService;
import com.hsi.lms.service.EmailServiceImpl;
import com.hsi.lms.service.StudentService;

import lombok.AllArgsConstructor;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
public class EmailController {
	
	@Autowired
	private StudentService studentService;
	
	@Autowired
	private EmailService emailService;
	
	@GetMapping("/sendEmail/{courseId}")
	public ResponseEntity<String> sendEmail(@PathVariable Long courseId) {
		
		List<String> emailIdList = studentService.getEmailIdOfStudentsInCourse(courseId);
		String subject = "HSI : Assignment file update notification";
		String body = "The assignment for the course you enrolled is updated in the system. Please take a note";
		
		for(String emailId : emailIdList) {
			if(!emailId.isEmpty()) {
				System.out.println(emailId);
				emailService.sendEmail(emailId, subject, body);
			}
		}
		
		return ResponseEntity.ok("Students notified!!");
		
	}
	

}
