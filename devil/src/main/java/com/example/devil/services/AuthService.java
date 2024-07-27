package com.example.devil.services;

import org.springframework.stereotype.Service;

import com.example.devil.general.User;
import com.example.devil.params.LoginParam;

@Service
public interface AuthService {
    String registerUser(User user);
    String loginUser(LoginParam loginParam);
    User getUserDetails();
}
