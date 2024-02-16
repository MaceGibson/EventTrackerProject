# EventTrackerProject - RESTful API

## Description

This project implements a RESTful API for a Habit Tracker application. The API allows users to create, read, update, and delete habits, as well as mark habits as completed or incomplete. The application is built using Spring Boot framework with Spring Data JPA for database interaction.

### URL
- For the AWS endpoints
```
http://3.13.43.122:8080/api/habits
```

## Technologies Used

- Java
- Spring Boot
- Spring Data JPA
- MySQL
- Postman (for API testing)

## Lessons Learned

Through this project, several key lessons were learned:
- Understanding and implementing RESTful API design principles.
- Integrating Spring Boot with Spring Data JPA for database operations.
- Handling HTTP requests and responses using Spring MVC.
- Testing APIs using Postman for validation and debugging.

## API Mappings/Explanations

### GET /api/habits
- Retrieves a list of all habits.

### GET /api/habits/{id}
- Retrieves a habit by it's ID.

### POST /api/habits
- Creates a new habit.
- Request Body:
  ```json
  {
    "userId": 1,
    "name": "Exercise",
    "description": "Go for a run",
    "completed": false
  }
  ```
### PUT /api/habits/{id}
- Updates an existing habit by it's id.
- Request Body:
  ```json
  {
  	"userId": 1,
  "name": "Exercise",
  "description": "Go for a walk",
  "completed": true
  }
  ```
### DELETE /api/habits/{id}
- Deletes a habit by it's id.

### PATCH /api/habits/{id}/complete
- Marks a habit as complete by it's id.

### PATCH /api/habits/{id}/incomplete
- Marks a habit as incomplete by it's id.