package com.hsi.lms.dto;

import java.sql.Blob;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDto{

	private Long courseId;
	private String courseName;
	private int duration;
	private String assignmentFileName;
	private String fileType;
	private Blob data;

}
