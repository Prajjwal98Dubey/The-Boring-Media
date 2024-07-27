package com.example.devil.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.devil.general.User;
import com.example.devil.params.LoginParam;
import com.example.devil.services.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class AuthControllers {
    @Autowired
    private AuthService authService;

    @PostMapping("/u/register")
    public String registerUser(@RequestBody User user) {
        return authService.registerUser(user);
    }
    @PostMapping("/u/login")
    public String loginUser(@RequestBody LoginParam loginParam){
        return authService.loginUser(loginParam);
    }
    @GetMapping("/u/details")
    public User getUserDetails(){
        return authService.getUserDetails();
    }
    }
    
    
