package com.hsi.lms.entity;

import java.sql.Blob;
import java.sql.Clob;
import java.sql.NClob;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name="course", uniqueConstraints = @UniqueConstraint(columnNames = {"course_name"}))
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long courseId;
	
	@Column(name = "course_name")
	private String courseName;
	
	//Course duration in months
	private int duration ;
	
	private String assignmentFileName;
	private String fileType;
	@Lob
	private Blob  data;

}
