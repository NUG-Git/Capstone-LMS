package com.hsi.lms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;

import com.hsi.lms.Exception.ResourceNotFoundException;
import com.hsi.lms.dto.InstructorDto;
import com.hsi.lms.entity.Instructor;
import com.hsi.lms.mapper.InstructorMapper;
import com.hsi.lms.repository.InstructorRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@ComponentScan("com.hsi.lms.repository")
public class InstructorServiceImpl implements InstructorService{
	
	@Autowired
	private InstructorRepository instructorRepository;
	
	@Override
	public List<InstructorDto> getAllInstructors() {
		
		List<Instructor> instructorList = instructorRepository.findAll();
		List<InstructorDto> instructorDtoList = instructorList.stream().
				map((ins)->InstructorMapper.mapToInstructorDto(ins)).collect(Collectors.toList());
		return instructorDtoList;
	}

	@Override
	public void deleteInstructor(Long instructorId) {
		
		instructorRepository.findById(instructorId).orElseThrow(()->
		new ResourceNotFoundException("Course with the given id " +instructorId+ " does not exist"));
		
		instructorRepository.deleteById(instructorId);
		
	}

	@Override
	public InstructorDto updateInstructor(Long instructorId, InstructorDto insDto) {
		
		Instructor instructor = instructorRepository.findById(instructorId).orElseThrow(()->
		new ResourceNotFoundException("Course with the given id " +instructorId+ " does not exist"));
		
		instructor.setInstructorName(insDto.getInstructorName());
		instructor.setEmail(insDto.getEmail());
		
		Instructor updatedInstructor = instructorRepository.save(instructor);
		
		return InstructorMapper.mapToInstructorDto(updatedInstructor);
		
	}

}
