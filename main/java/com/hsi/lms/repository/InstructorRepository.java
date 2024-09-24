package com.hsi.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hsi.lms.entity.Instructor;
@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Long>{

}
