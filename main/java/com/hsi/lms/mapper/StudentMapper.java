package com.hsi.lms.mapper;

import com.hsi.lms.dto.StudentDto;
import com.hsi.lms.entity.Student;

public class StudentMapper {

	public static StudentDto mapToStudentDto(Student student) {
		
		StudentDto studentDto = new StudentDto(student.getStudentId(), student.getStudentName(), student.getEmail(),
				student.getFileName(), student.getFileType(), student.getData(), student.getGrade(),student.getCourseId(),student.getCourseName());
		
		return studentDto;
	}
	
	public static Student mapToStudent(StudentDto studentDto) {
		
		Student student = new Student(studentDto.getStudentId(), studentDto.getStudentName(), studentDto.getEmail(),
				studentDto.getFileName(), studentDto.getFileType(), studentDto.getData(), studentDto.getGrade(),studentDto.getCourseId(), studentDto.getCourseName());
		
		return student;
	}
}
