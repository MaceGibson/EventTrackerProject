package com.skilldistillery.eventtracker.entities;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String email;
	private String username;
	private String password;
	private boolean enabled;
	private String role;

	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<Habit> habits;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<Habit> getHabits() {
		return habits;
	}

	public void setHabits(List<Habit> habits) {
		this.habits = habits;
	}

	public User() {
		super();
	}

	public User(int id, String email, String username, String password, boolean enabled, String role, List<Habit> habits) {
		super();
		this.id = id;
		this.email = email;
		this.username = username;
		this.password = password;
		this.enabled = enabled;
		this.role = role;
		this.habits = habits;
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
		User other = (User) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", username=" + username + ", password=" + password
				+ ", enabled=" + enabled + ", role=" + role + ", habits=" + habits + "]";
	}

}
