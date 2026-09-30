package com.example.student.controller;

import com.example.student.model.Student;
import com.example.student.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<List<Student>> getStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @PostMapping
    public ResponseEntity<String> addStudent(@RequestBody Student student) {
        if (invalid(student)) {
            return ResponseEntity.badRequest().body("Name and email are required.");
        }
        studentService.addStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body("Student added successfully.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable int id, @RequestBody Student student) {
        if (invalid(student)) {
            return ResponseEntity.badRequest().body("Name and email are required.");
        }
        if (studentService.updateStudent(id, student) == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Student updated successfully.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id) {
        if (studentService.deleteStudent(id) == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Student deleted successfully.");
    }

    private boolean invalid(Student student) {
        return student == null ||
            student.getName() == null || student.getName().trim().isEmpty() ||
            student.getEmail() == null || student.getEmail().trim().isEmpty();
    }
}
