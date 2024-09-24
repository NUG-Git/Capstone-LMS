package com.hsi.lms.repository;

import java.util.Optional;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hsi.lms.entity.UserEntity;

@Repository
@ComponentScan("com.hsi.lms.entity")
public interface LoginRepository extends JpaRepository<UserEntity, Long>{
	
	public UserEntity findByEmail(String email);
	
	public Optional<UserEntity> findOneByEmailAndPassword(String email, String password);

}
