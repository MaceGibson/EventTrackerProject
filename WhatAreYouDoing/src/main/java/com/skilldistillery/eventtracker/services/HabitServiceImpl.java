package com.skilldistillery.eventtracker.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.Habit;
import com.skilldistillery.eventtracker.entities.User;
import com.skilldistillery.eventtracker.repositories.HabitRepository;
import com.skilldistillery.eventtracker.repositories.UserRepository;

@Service
public class HabitServiceImpl implements HabitService {
	@Autowired
	private HabitRepository habitRepo;
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<Habit> index(String username) {
		List<Habit> habits = habitRepo.findByUser_Username(username);
		System.out.println(habits);
		
		return habits;
	}

	@Override
	public Habit create(String username, Habit habit) {
		User user = userRepo.findByUsername(username);
		if(user != null) {
			habit.setUser(user);
			return habitRepo.saveAndFlush(habit);
		}
		return null;
	}

	@Override
	public Habit update(String username, int id, Habit habit) {
	    Habit existingHabit = show(username, id);
	    if (existingHabit != null) {
	        existingHabit.setName(habit.getName());
	        existingHabit.setDescription(habit.getDescription());
	        existingHabit.setDate(LocalDateTime.now());
	        return habitRepo.saveAndFlush(existingHabit);
	    }
	    return null;
	}

	@Override
	public boolean destroy(String username, int id) {
		Habit existingHabit = show(username, id);
		if (existingHabit != null) {
			habitRepo.delete(existingHabit);
			return true;
		}
		return false;
	}

	@Override
	public Habit show(String username, int id) {
		Optional<Habit> optionalHabit = habitRepo.findById(id);
		if (optionalHabit.isPresent()) {
			Habit habit = optionalHabit.get();
			if (habit.getUser() != null && habit.getUser().getUsername().equals(username)) {
				return habit;
			}
		}
		return null;
	}

	
	
}