package com.hsi.lms.repository;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hsi.lms.entity.Student;
import com.hsi.lms.entity.StudentReportBean;

@Repository
@ComponentScan("com.hsi.lms.entity")
public interface StudentRepository extends JpaRepository<Student, Long>{
	
//	@Query(value="select  new com.hsi.lms.entity.StudentReportBean(count(student_id),course_name,course_id) from students group by course_id, course_name")
//	List<StudentReportBean> computeCourseStudentMap();
	
//	@Query(value="select course_name, count(student_id) from students group by course_name", nativeQuery = true)
//	Collection getReport();
	
	long countByCourseId(Long courseId);

	Student findByEmail(String email);
	
	List<Student> getStudentsByCourseId(Long courseId);
	
	
	
}
