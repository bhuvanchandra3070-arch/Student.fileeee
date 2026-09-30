# Student Management System

Full-stack CRUD application using Java 17, Spring Boot, Spring JDBC, MySQL, HTML, CSS and JavaScript.

## Run locally

1. Install Java 17, Maven and MySQL.
2. Execute `database.sql` in MySQL.
3. Open `src/main/resources/application.properties`.
4. Replace `YOUR_MYSQL_PASSWORD` with your MySQL password.
5. Run:

```bash
mvn spring-boot:run
```

6. Open:

```text
http://localhost:8080
```

## API

- GET `/api/students`
- POST `/api/students`
- PUT `/api/students/{id}`
- DELETE `/api/students/{id}`

## Important

GitHub is used to store the source code. GitHub Pages cannot run the Spring Boot backend or MySQL database. For a public working application, deploy the backend and database on a service that supports Java and MySQL, then configure the database connection using environment variables.

Never commit a real database password to GitHub.
