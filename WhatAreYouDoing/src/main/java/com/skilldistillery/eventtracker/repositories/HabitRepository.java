package com.skilldistillery.eventtracker.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.skilldistillery.eventtracker.entities.Habit;

public interface HabitRepository extends JpaRepository<Habit, Integer> {
	
	List<Habit> findByUser_Username(String username);


}
