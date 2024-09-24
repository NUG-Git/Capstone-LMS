package com.hsi.lms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class EmailServiceImpl implements EmailService{

	@Autowired
	private JavaMailSenderImpl mailSender;
	
	@Value("$(spring.mail.username)")
	private String fromEmailId;
	
	public void sendEmail(String recipient, String subject, String body){
		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		simpleMailMessage.setFrom(fromEmailId);
		simpleMailMessage.setTo(recipient);
		simpleMailMessage.setSubject(subject);
		simpleMailMessage.setText(body);
		
		
		mailSender.send(simpleMailMessage);
		
	} 

	
}
