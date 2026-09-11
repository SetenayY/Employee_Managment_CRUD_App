package com.example.demo.service;

import com.example.demo.messaging.EmployeeProducer;
import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeProducer employeeProducer;

    private void validateManager(Integer managerId) {
        if (managerId != null && !employeeRepository.existsById(managerId)) {
            throw new IllegalArgumentException("No employee with id " + managerId + " was found. Enter valid manager id!");
        }
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Integer id) {
        return employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee with id: " + id + " not found!"));
    }

    public Employee createEmployee(Employee employee) {
        Employee savedEmployee = employeeRepository.save(employee);
        employeeProducer.sendEmployeeCreatedEvent(savedEmployee);
        return savedEmployee;
    }

    public Employee updateEmployee(Integer id, Employee employeeDetails) {
        validateManager(employeeDetails.getManagerId());
        Employee existingEmployee = getEmployeeById(id);
        existingEmployee.setFirstName(employeeDetails.getFirstName());
        existingEmployee.setLastName(employeeDetails.getLastName());
        existingEmployee.setEmail(employeeDetails.getEmail());
        existingEmployee.setPhoneNumber(employeeDetails.getPhoneNumber());
        existingEmployee.setSalary(employeeDetails.getSalary());
        existingEmployee.setJobId(employeeDetails.getJobId());
        existingEmployee.setDepartmentId(employeeDetails.getDepartmentId());
        existingEmployee.setManagerId(employeeDetails.getManagerId());
        Employee updatedEmployee = employeeRepository.save(existingEmployee);
        employeeProducer.sendEmployeeUpdatedEvent(updatedEmployee);
        return updatedEmployee;    
    }

    public void deleteEmployee(Integer id) {
        employeeRepository.deleteById(id);
        employeeProducer.sendEmployeeDeletedEvent(id);
    }
}