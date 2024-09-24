package com.hsi.lms.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.hsi.lms.dto.CourseDto;
import com.hsi.lms.dto.ReportDto;


public interface AdminService {

	CourseDto createCourse(CourseDto courseDto);
	
	CourseDto getCourseById(Long courseId);
	
	List<CourseDto> getAllCourse();
	
	CourseDto updateCourse(Long courseId, CourseDto courseDto) ;
	
	void deleteCourse(Long courseId);
	
	List<String> getCourseNames();
	
	CourseDto updateAssignmentFile(MultipartFile file, Long courseId);
	
	List<ReportDto> getCourseStudentReport();
	
}
