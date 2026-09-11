package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table( name = "departments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id")
    private Integer id;

    @Column(name = "department_name", length = 20)
    private String departmentName;
}