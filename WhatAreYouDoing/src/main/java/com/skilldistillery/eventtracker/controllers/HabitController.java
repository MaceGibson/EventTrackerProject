package com.skilldistillery.eventtracker.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.Habit;
import com.skilldistillery.eventtracker.services.HabitService;

@RestController
@RequestMapping("api/habits")
public class HabitController {
	@Autowired
	private HabitService habitService;

	@GetMapping
	public List<Habit> findAll() {
		return habitService.findAll();
	}

	@GetMapping("{id}")
	public ResponseEntity<Habit> findById(@PathVariable("id") int id) {
		Habit habit = habitService.findById(id);
		if (habit != null) {
			return new ResponseEntity<>(habit, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping
	public ResponseEntity<Habit> create(@RequestBody Habit habit) {
		Habit createdHabit = habitService.create(habit);
		return new ResponseEntity<>(createdHabit, HttpStatus.CREATED);
	}

	@PutMapping("{id}")
	public ResponseEntity<Habit> update(@PathVariable("id") int id, @RequestBody Habit habit) {
		Habit updatedHabit = habitService.update(id, habit);
		if (updatedHabit == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(updatedHabit, HttpStatus.OK);
		}
	}

	@DeleteMapping("{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id) {
		boolean deleted = habitService.delete(id);
		if (deleted) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PatchMapping("{id}")
	public ResponseEntity<Void> updateCompletedStatus(@PathVariable("id") int id, @RequestBody Map<String, Boolean> request) {
		boolean updated = habitService.updateCompletedStatus(id, request.get("completed"));
		if(updated) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
