package com.skilldistillery.eventtracker.services;

import com.skilldistillery.eventtracker.entities.User;

public interface AuthService {
	public User register(User user);
	public User getUserByUsername(String username);

}
