package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table( name = "dependents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Dependent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dependent_id")
    private Integer id;

    @Column(name = "first_name", length = 20)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 25)
    private String lastName;
    
    @Column(name = "relationship", nullable = false, length = 15)
    private String relationship;

    @Column(name = "employee_id")
    private Integer employeeId;
}