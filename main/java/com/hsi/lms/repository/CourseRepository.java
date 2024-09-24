package com.hsi.lms.repository;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.hsi.lms.entity.Course;

@Repository
@ComponentScan("com.hsi.lms.entity")
public interface CourseRepository extends JpaRepository<Course, Long>{
	
}
