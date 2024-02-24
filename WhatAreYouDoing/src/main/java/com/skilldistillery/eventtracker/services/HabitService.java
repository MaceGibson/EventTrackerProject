package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.entities.Habit;

public interface HabitService {
	List<Habit> findByTitleOrDescription(String keyword);
	Habit findById(int id);
	List<Habit> findByCompleted(boolean completed);
	List<Habit> findAll();
	Habit create(Habit habit);
	Habit update(int id, Habit habit);
	boolean delete(int id);
	boolean updateCompletedStatus(int habitId, Boolean completed);

}
