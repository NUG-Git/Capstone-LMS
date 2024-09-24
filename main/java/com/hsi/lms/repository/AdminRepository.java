package com.hsi.lms.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hsi.lms.entity.Admin;
@Repository
public interface AdminRepository extends JpaRepository<Admin,Long>{
	
	

}
