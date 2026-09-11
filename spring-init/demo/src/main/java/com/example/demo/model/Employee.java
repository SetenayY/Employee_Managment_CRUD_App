package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import io.swagger.v3.oas.annotations.media.Schema;

@Entity
@Table( name = "employees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    @Schema(accessMode = Schema.AccessMode.READ_ONLY, description = "Auto-generated database ID", example = "1")
    private Integer id;

    @NotBlank(message = "First name is required")
    @Size(max = 20, message = "First name cannot exceed 20 characters")
    @Column(name = "first_name")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 25, message = "Last name cannot exceed 25 characters")
    @Column(name = "last_name")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be a valid email address")
    @Size(max = 100, message = "Email cannot exceed 100 characters")
    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @NotNull(message = "Hire date is required")
    @Column(name = "hire_date")
    private LocalDate hireDate;

    @NotNull(message = "Job ID is required")
    @Column(name = "job_id")
    private Integer jobId;

    @Positive(message = "Salary must be greater than zero")
    @Column(name = "salary")
    private BigDecimal salary;

    @Column(name = "manager_id", nullable = true)
    private Integer managerId;

    @Column(name = "department_id")
    private Integer departmentId;
}