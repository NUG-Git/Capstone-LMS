package com.hsi.lms.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="instructor")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Instructor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long instructorId;
	private String instructorName;
	private String email;
	private boolean approved;
	

}
