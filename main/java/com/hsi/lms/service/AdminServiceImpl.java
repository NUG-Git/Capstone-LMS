package com.hsi.lms.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.io.IOException;

import org.hibernate.engine.jdbc.BlobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.hsi.lms.Exception.FileStorageException;
import com.hsi.lms.Exception.ResourceNotFoundException;
import com.hsi.lms.dto.CourseDto;
import com.hsi.lms.dto.ReportDto;
import com.hsi.lms.entity.Course;
import com.hsi.lms.entity.StudentReportBean;
import com.hsi.lms.mapper.CourseMapper;
import com.hsi.lms.repository.CourseRepository;
import com.hsi.lms.repository.StudentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@ComponentScan("com.hsi.lms.repository")
public class AdminServiceImpl implements AdminService{

	@Autowired
	private CourseRepository courseRepository;
	
	@Autowired
	private StudentRepository studentRepository;
	
	@Override
	public CourseDto createCourse(CourseDto courseDto) {
		
    	Course course = CourseMapper.mapToCourse(courseDto);
    	Course savedCourse = courseRepository.save(course);
    	return CourseMapper.mapToCourseDto(savedCourse);
      
		
	}

	@Override
	public CourseDto getCourseById(Long courseId) {
		
		Course course = courseRepository.findById(courseId).orElseThrow(()->
		new ResourceNotFoundException("Course with the given id " +courseId+ " does not exist"));
		
		return CourseMapper.mapToCourseDto(course);
	}

	@Override
	public List<CourseDto> getAllCourse() {
		List<Course> courseList = courseRepository.findAll();
		List<CourseDto> courseDtoList = courseList.stream().
				map((course)->CourseMapper.mapToCourseDto(course)).collect(Collectors.toList());
		return courseDtoList;
	}

	@Override
	public CourseDto updateCourse(Long courseId,CourseDto courseDto)  {
		
		Course course = courseRepository.findById(courseId).orElseThrow(()->
		new ResourceNotFoundException("Course with the given id " +courseId+ " does not exist"));
		
		course.setCourseName(courseDto.getCourseName());
		course.setDuration(courseDto.getDuration());
		Course updatedCourse = courseRepository.save(course);
		return CourseMapper.mapToCourseDto(updatedCourse);
	}

	@Override
	public void deleteCourse(Long courseId) {
		
		courseRepository.findById(courseId).orElseThrow(()->
		new ResourceNotFoundException("Course with the given id " +courseId+ " does not exist"));
		
		courseRepository.deleteById(courseId);
		
	}

	@Override
	public List<String> getCourseNames() {
		
		List<String> courseNames = new ArrayList<String>();
		
		List<Course> courses = courseRepository.findAll();
		
		if(courses.size()!=0) {
			for(Course course : courses) {
				courseNames.add(course.getCourseName());
			}
		}
		
		return courseNames;
	}

	@Override
	public CourseDto updateAssignmentFile(MultipartFile file, Long courseId) {
		 
		Course course = courseRepository.findById(courseId).orElseThrow(()->
		new ResourceNotFoundException("Course with the given id " +courseId+ " does not exist"));
		
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		try {
			if(fileName.contains("..")) {
				throw new FileStorageException("File name contains invalid path sequence"+fileName);	
			}
			
			course.setAssignmentFileName(fileName);
			course.setFileType(file.getContentType());
			
			course.setData(BlobProxy.generateProxy(file.getBytes()));
			
			Course updatedCourse = courseRepository.save(course);
			return CourseMapper.mapToCourseDto(updatedCourse);
			
			
		}catch(IOException e){
			throw new FileStorageException("Could not save file: "+fileName, e);
		}
		
	}

	@Override
	public List<ReportDto> getCourseStudentReport() {
		
		//Map<String, Long> reportMap = new LinkedHashMap<>();
		List<Course> courses = courseRepository.findAll();
		
		List<ReportDto> reportList = new ArrayList<>();
		ReportDto report = null;
		
		for(Course course : courses) {
			report = new ReportDto();
			report.setCourseName(course.getCourseName());
			report.setStudentCount(studentRepository.countByCourseId(course.getCourseId()));
			reportList.add(report);
		}
		
		return reportList;
	}
	
}
