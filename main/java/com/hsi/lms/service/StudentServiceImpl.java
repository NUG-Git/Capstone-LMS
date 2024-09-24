package com.hsi.lms.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.hsi.lms.Exception.FileStorageException;
import com.hsi.lms.Exception.ResourceNotFoundException;
import com.hsi.lms.dto.StudentDto;
import com.hsi.lms.entity.Student;
import com.hsi.lms.mapper.StudentMapper;
import com.hsi.lms.repository.StudentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@ComponentScan("com.hsi.lms.repository")
public class StudentServiceImpl implements StudentService{
	
	@Autowired
	private StudentRepository studentRepository;
	
	//Get all students enrolled in a given course
	@Override
	public List<StudentDto> getStudentsInCourse(Long courseId) {
		
		List<Student> studentList = studentRepository.getStudentsByCourseId(courseId);
		
		List<StudentDto> studentDtoList = studentList.stream().
				map((student)->StudentMapper.mapToStudentDto(student)).collect(Collectors.toList());
		return studentDtoList;
	}
	
	@Override
	public List<String> getEmailIdOfStudentsInCourse(Long courseId){
		List<Student> studentList = studentRepository.findAll();
		List<String> emailIdList = new ArrayList<>();
		
		for(Student student: studentList) {
			if(student.getCourseId()==courseId) {
				emailIdList.add(student.getEmail());
			}
		}
			
		return emailIdList;
	}
	

	// Get all students 
	@Override
	public List<StudentDto> getAllStudents() {
		List<Student> students = studentRepository.findAll();
		List<StudentDto> studentDtos = students.stream().map((student)->StudentMapper.mapToStudentDto(student)).collect(Collectors.toList());
		
		return studentDtos;
	}

	@Override
	public StudentDto updateGrade(Long studentId, float grade) {
		
		Student student = studentRepository.findById(studentId).orElseThrow(()->
		new ResourceNotFoundException("Student with the given id "+studentId+"does not exist"));
		
		student.setGrade(grade); 
	
		Student updatedStudent = studentRepository.save(student);
		StudentDto updatedStudentDto = StudentMapper.mapToStudentDto(updatedStudent);
		return updatedStudentDto;
	}

	@Override
	public StudentDto enrollStudent(Long studentId, String course) {
		
		Student student = studentRepository.findById(studentId).orElseThrow(()->
		new ResourceNotFoundException("Student with the given id "+studentId+"does not exist"));
		
		
		student.setCourseName(course);
		Student updatedStudent = studentRepository.save(student);
		StudentDto updatedStudentDto = StudentMapper.mapToStudentDto(updatedStudent);
		
		return updatedStudentDto;
	}

	@Override
	public StudentDto findStudentByEmail(String email) {
		
		
		Student student = studentRepository.findByEmail(email);
		
		
		StudentDto studentDto = StudentMapper.mapToStudentDto(student);
		
		
		return studentDto;
	}
	
	@Override
	public StudentDto updateAssignmentFile(MultipartFile file, Long studentId) {
		 
		Student student = studentRepository.findById(studentId).orElseThrow(()->
		new ResourceNotFoundException("Student with the given id " +studentId+ " does not exist"));
		
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		try {
			if(fileName.contains("..")) {
				throw new FileStorageException("File name contains invalid path sequence"+fileName);	
			}
			
			student.setFileName(fileName);
			student.setFileType(file.getContentType());
			
			student.setData(file.getBytes());
			
			Student updatedStudent = studentRepository.save(student);
			return StudentMapper.mapToStudentDto(updatedStudent);
			
			
		}catch(IOException e){
			throw new FileStorageException("Could not save file: "+fileName, e);
		}
		
	}

	@Override
	public StudentDto getStudentById(Long studentId) {
		Student student = studentRepository.findById(studentId).orElseThrow(()->
		new ResourceNotFoundException("Student with the given id " +studentId+ " does not exist"));
		
		return StudentMapper.mapToStudentDto(student);
	}

	@Override
	public StudentDto updateStudent(Long studentId, StudentDto studentDto) {
		
		Student student = studentRepository.findById(studentId).orElseThrow(()->
		new ResourceNotFoundException("Student with the given id " +studentId+ " does not exist"));
		
		//student.setCourseId(studentDto.getCourseId());
		//student.setCourseName(studentDto.getCourseName());
		student.setEmail(studentDto.getEmail());
		student.setStudentName(studentDto.getStudentName());
		
		Student updatedStudent = studentRepository.save(student);
		
		return StudentMapper.mapToStudentDto(updatedStudent);
	}

	@Override
	public void deleteStudent(Long studentId) {
		studentRepository.findById(studentId).orElseThrow(()->
		new ResourceNotFoundException("Student with the given id " +studentId+ " does not exist"));
		
		studentRepository.deleteById(studentId);
		
	}
}
