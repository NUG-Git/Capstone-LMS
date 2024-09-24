package com.hsi.lms.service;

public interface EmailService {

	void sendEmail(String recipient, String subject, String body);
}
