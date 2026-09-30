package com.example.student.dao;

import com.example.student.model.Student;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class StudentDAO {
    private final JdbcTemplate jdbcTemplate;

    public StudentDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Student> getAllStudents() {
        String sql = "SELECT id, name, email FROM students ORDER BY id DESC";
        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new Student(rs.getInt("id"), rs.getString("name"), rs.getString("email"))
        );
    }

    public int addStudent(Student student) {
        return jdbcTemplate.update(
            "INSERT INTO students (name, email) VALUES (?, ?)",
            student.getName(), student.getEmail()
        );
    }

    public int updateStudent(int id, Student student) {
        return jdbcTemplate.update(
            "UPDATE students SET name = ?, email = ? WHERE id = ?",
            student.getName(), student.getEmail(), id
        );
    }

    public int deleteStudent(int id) {
        return jdbcTemplate.update("DELETE FROM students WHERE id = ?", id);
    }
}
