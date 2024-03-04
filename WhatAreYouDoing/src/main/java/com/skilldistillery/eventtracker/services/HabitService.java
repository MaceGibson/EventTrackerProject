package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.entities.Habit;

public interface HabitService {
	List<Habit> index(String username);
	Habit show(String username, int id);
	Habit create(String username, Habit habit);
	Habit update(String username, int id, Habit habit);
	boolean destroy(String username, int id);

}
