package com.hsi.lms.mapper;

import com.hsi.lms.dto.CourseDto;
import com.hsi.lms.entity.Course;

public class CourseMapper {

	public static CourseDto mapToCourseDto(Course course)  {
			
		return new CourseDto (
				course.getCourseId(), course.getCourseName(), course.getDuration(), 
				course.getAssignmentFileName(), course.getFileType(),course.getData() );
	}
	
	public static Course mapToCourse(CourseDto courseDto) {
		
		
		
		return new Course(
				courseDto.getCourseId(),courseDto.getCourseName(),courseDto.getDuration(),
				courseDto.getAssignmentFileName(), courseDto.getFileType(), courseDto.getData());
	}
	

}


