package com.hsi.lms.service;

import java.util.List;
import com.hsi.lms.dto.InstructorDto;

public interface InstructorService {

	List<InstructorDto> getAllInstructors();
	
	void deleteInstructor(Long instructorId);
	
	InstructorDto updateInstructor(Long instructorId, InstructorDto insDto);
}
