package com.skilldistillery.eventtracker.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.Habit;
import com.skilldistillery.eventtracker.services.HabitService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class HabitController {
	@Autowired
	private HabitService habitService;

	@GetMapping("habits")
	public List<Habit> index(Principal principal, HttpServletRequest req, HttpServletResponse res) {
		return habitService.index(principal.getName());
	}

	@GetMapping("habits/{id}")
	public ResponseEntity<Habit> show(Principal principal, HttpServletRequest req, HttpServletResponse res,
			@PathVariable("id") int id) {
		Habit habit = habitService.show(principal.getName(), id);
		if (habit != null) {
			return new ResponseEntity<>(habit, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("habits")
	public ResponseEntity<Habit> create(Principal principal, HttpServletRequest req, HttpServletResponse res,
			@RequestBody Habit habit) {
		try {
			habit = habitService.create(principal.getName(), habit);
			if (habit != null) {
				res.setStatus(201);
				res.setHeader("Location", req.getRequestURL().append("/").append(habit.getId()).toString());
			} else {
				res.setStatus(401);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			habit = null;
		}
		return new ResponseEntity<>(habit, HttpStatus.CREATED);
	}

	@PutMapping("habits/{id}")
	public ResponseEntity<Habit> update(Principal principal, HttpServletRequest req, HttpServletResponse res,
			@PathVariable("id") int id, @RequestBody Habit habit) {
		Habit updated;
		try {
			updated = habitService.update(principal.getName(), id, habit);
			if (updated == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			habit = null;
		}
		return new ResponseEntity<>(habit, HttpStatus.OK);
	}

	@DeleteMapping("habits/{id}")
	public ResponseEntity<Void> destroy(Principal principal, HttpServletRequest req, HttpServletResponse res,
			@PathVariable("id") int id) {
		boolean deleted = habitService.destroy(principal.getName(), id);
		if (deleted) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
