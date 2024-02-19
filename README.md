# EventTrackerProject - RESTful API

## Description

This project implements a RESTful API for a Habit Tracker application. The API allows users to create, read, update, and delete habits, as well as mark habits as completed or incomplete. The application is built using Spring Boot framework with Spring Data JPA for database interaction.

### URL
- For the AWS endpoints
```
http://3.13.43.122:8080/WhateAreYouDoing/api/habits
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
- Testing APIs using Postman for validation and debugging.

## API Mappings/Explanations

| HTTP Verb | URI                                   | Request Body                        | Response Body                     | Status Codes |
|-----------|---------------------------------------|-------------------------------------|-----------------------------------|--------------|
| GET       | `/api/habits`                         |                                     | List of all habits                | 200          |
| GET       | `/api/habits/{id}`                    |                                     | Habit with the specified ID       | 200, 404     |
| POST      | `/api/habits`                         | JSON of a new habit entity          | Created habit                     | 201, 400     |
| PUT       | `/api/habits/{id}`                    | JSON of a new version of a habit    | Updated habit                     | 200, 404, 400|
| DELETE    | `/api/habits/{id}`                    |                                     |                                   | 204, 404, 400|
| PATCH     | `/api/habits/{id}/complete`           |                                     | Mark habit as completed           | 200, 404, 400|
| PATCH     | `/api/habits/{id}/incomplete`         |                                     | Mark habit as incomplete          | 200, 404, 400|
