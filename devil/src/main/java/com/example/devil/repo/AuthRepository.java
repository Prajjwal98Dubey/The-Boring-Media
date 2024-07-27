package com.example.devil.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.devil.entities.AuthEntity;

@Repository
public interface AuthRepository extends JpaRepository<AuthEntity,Long> {
    
}
