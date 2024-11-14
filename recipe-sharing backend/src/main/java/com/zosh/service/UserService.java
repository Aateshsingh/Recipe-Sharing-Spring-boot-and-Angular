package com.zosh.service;

import com.zosh.model.User;

public interface UserService {

    public User findUserById(Long userId) throws Exception;
    public User findUserByJwt(String jwt) throws Exception;
}
