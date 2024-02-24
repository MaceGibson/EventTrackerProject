package com.skilldistillery.eventtracker.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.Habit;
import com.skilldistillery.eventtracker.repositories.HabitRepository;

@Service
public class HabitServiceImpl implements HabitService {
	@Autowired
	private HabitRepository habitRepo;

	@Override
	public List<Habit> findByTitleOrDescription(String keyword) {
		return habitRepo.findByNameContainingOrDescriptionContaining(keyword, keyword);
	}

	@Override
	public Habit findById(int id) {
		return habitRepo.findById(id);
	}

	@Override
	public List<Habit> findByCompleted(boolean completed) {
		return habitRepo.findByCompleted(completed);
	}

	@Override
	public List<Habit> findAll() {
		return habitRepo.findAll();
	}

	@Override
	public Habit create(Habit habit) {
		return habitRepo.saveAndFlush(habit);
	}

	@Override
	public Habit update(int id, Habit habit) {
	    Habit existingHabit = habitRepo.findById(id);
	    if (existingHabit != null) {
	        existingHabit.setName(habit.getName());
	        existingHabit.setDescription(habit.getDescription());
	        existingHabit.setDate(LocalDateTime.now());
	        return habitRepo.save(existingHabit);
	    }
	    return null;
	}

	@Override
	public boolean delete(int id) {
		Habit existingHabit = habitRepo.findById(id);
		if (existingHabit != null) {
			habitRepo.delete(existingHabit);
			return true;
		}
		return false; // Habit with given id not found
	}

	@Override
	public boolean updateCompletedStatus(int habitId, Boolean completed) {
	    Habit habit = habitRepo.findById(habitId);
	    if (habit != null && completed != null) {
	        habit.setCompleted(completed);
	        habitRepo.save(habit);
	        return true;
	    }
	    return false;
	}
	
}