CREATE DATABASE IF NOT EXISTS student_app;
USE student_app;

CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL
);

INSERT INTO students (name, email)
SELECT 'John Doe', 'john@example.com'
WHERE NOT EXISTS (SELECT 1 FROM students WHERE email='john@example.com');
