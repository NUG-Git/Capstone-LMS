package com.hsi.lms.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class StudentReportBean {

	@Id
	private Long courseId;
	private String courseName;
	private Long studentCount;
	
	
}
