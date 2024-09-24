package com.hsi.lms.mapper;

import com.hsi.lms.dto.InstructorDto;
import com.hsi.lms.entity.Instructor;

public class InstructorMapper {

	public static InstructorDto mapToInstructorDto(Instructor instructor) {		
		InstructorDto insDto = new InstructorDto(instructor.getInstructorId(),instructor.getInstructorName(),
				instructor.getEmail(),instructor.isApproved());	
		return insDto;	
	}
	
	public static Instructor mapToInstructor(InstructorDto insDto) {
		Instructor ins = new Instructor(insDto.getInstructorId(),insDto.getInstructorName(),
				insDto.getEmail(),insDto.isApproved());
		
		return ins;
	}
}
