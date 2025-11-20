package com.wichita.clinic.service;

import com.wichita.clinic.entity.User;

import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> findByName(String username);
}

