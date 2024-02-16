package com.skilldistillery.eventtracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.eventtracker.entities.Habit;

public interface HabitRepository extends JpaRepository<Habit, Integer> {
	
	List<Habit> findByNameContainingOrDescriptionContaining(String name, String description);
	Habit findById (int id);
	List<Habit> findByCompleted(boolean completed);


}
