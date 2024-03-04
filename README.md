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


# EventTrackerProject - Front-end No Angular

## Description

This was the second phase of this project.  Here the front-end was both hardcoded in html and dynamically added with JavaScript.

## URL
- For the AWS deployed application
```
http://3.13.43.122:8080/WhatAreYouDoing/index.html
```

- NOTE: this will display an empty table as I need to implement the user login for this as the database was changed to allow for angular.

## Technologies Used

- JavaScript (asynch programming, dyanamic html)
- CSS (custom and bootstrap)

## Lessons Learned

- Targeting the DOM with JavaScript
- Adding html elements dynamically with JavaScript
- EventListeners and modals, these were new to me.

## Things to Improve

- I wish I would have taken the time to allow for the reorganization of the list items to reflect on the database.
- Could tweak the layout of the modal to be more modern styled.
- Had this been a multi-table project would need to add user table for user login, this would make the page more practical allowing users to have their own respective tables.
- Future implementations could perhaps look into the more social aspects to allow users to coordinate their plans with others.


# EventTrackerProject - Angular Front-end

## Description

This is the final phase where angular was brought to the equation.  From here futher iterations will be exploring angular.

## URL
```
http://3.13.43.122:8080/WhatAreYouDoing
```

## Technologies Used

- Angular

## Lessons Learned

- Adding authentication is not easy and will break things until fully realized.
- Generating components, models, pipes, and services with angular.