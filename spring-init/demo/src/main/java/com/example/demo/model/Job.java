package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table( name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id")
    private Integer id;

    @Column(name = "job_title", length = 20)
    private String jobTitle;

    @Column(name = "min_salary", nullable = false, precision = 8, scale = 2)
    private BigDecimal minSalary;

    @Column(name = "max_salary", nullable = false, precision = 8, scale = 2)
    private BigDecimal maxSalary;
}