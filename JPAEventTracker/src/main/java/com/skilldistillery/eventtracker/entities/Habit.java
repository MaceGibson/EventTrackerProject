package com.skilldistillery.eventtracker.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Habit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String description;
	private boolean completed;
	@CreationTimestamp
	private LocalDateTime date;

	@Column(name = "complete_date")
	private String completeDate;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	public Habit() {
		super();
	}

	public Habit(int id, User user, String name, String description, LocalDateTime date, boolean completed) {
		super();
		this.id = id;
		this.user = user;
		this.name = name;
		this.description = description;
		this.date = date;
		this.completed = completed;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public boolean getCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Habit other = (Habit) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Habit [id=" + id + "user= " + user.getUsername() + ", name=" + name + ", description=" + description + ", date="
				+ date + ", completed=" + completed + "]";
	}

	public void addComment(String comment) {

	}

}