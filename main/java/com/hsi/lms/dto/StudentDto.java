package com.hsi.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDto {
	
	private Long studentId;
	private String studentName;
	private String email;
	private String fileName;
	private String fileType;
	private byte[] data;
	private float grade;
	private Long courseId;
	private String courseName;

}
