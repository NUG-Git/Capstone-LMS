package com.hsi.lms.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentResponse {
	
	private Long id;
	private String fileName;
	private String fileType;
	private Long fileSize;
	private String downloadURL;

}
