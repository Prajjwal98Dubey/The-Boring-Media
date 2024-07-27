package com.example.devil.services;

import java.util.*;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.example.devil.entities.AuthEntity;
import com.example.devil.general.User;
import com.example.devil.params.LoginParam;
import com.example.devil.repo.AuthRepository;
import com.example.devil.utils.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthRepository authRepository;

    @Override
    public String registerUser(User user) {
        AuthEntity authEntity = new AuthEntity();
        BeanUtils.copyProperties(user, authEntity);
        String strongSalt = BCrypt.gensalt(10);
        String hashedPassword = BCrypt.hashpw(user.getPassword(), strongSalt);
        authEntity.setPassword(hashedPassword);
        authRepository.save(authEntity);
        String token = jwtUtil.generateToken(user.getUsername());
        return token;
    }

    @Override
    public String loginUser(LoginParam loginParam) {
        List<AuthEntity> authEntities = new ArrayList<>();
        authEntities = authRepository.findAll();
        String enteredUserName = loginParam.getUsername();
        String enteredPassword = loginParam.getPassword();
        AuthEntity enteredUser = new AuthEntity();
        for (AuthEntity user : authEntities) {
            if (user.getUsername().equals(enteredUserName) || user.getEmail().equals(enteredUserName)) {
                BeanUtils.copyProperties(user, enteredUser);
                break;
            }
        }
        if (enteredUser.getUsername() != null) {
            String hashedPassword = enteredUser.getPassword();
            boolean isUserValid = BCrypt.checkpw(enteredPassword, hashedPassword);
            if (isUserValid)
            {
                String token = jwtUtil.generateToken(enteredUserName);
                return token;
            }
                
            return "Invalid Credentials";

        } else {
            return "No User Exists.";
        }

    }

    @Override
    public User getUserDetails(){
        User user = new User();
        return user;
    }



}
