import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Employee } from '../types/employee.ts';
import * as api from '../services/EmployeeService.ts';

interface EmployeeContextType {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  fetchEmployees: () => void;
  addEmployee: (emp: Employee) => Promise<void>;
  editEmployee: (id: number, emp: Employee) => Promise<void>;
  removeEmployee: (id: number) => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getEmployees();
      setEmployees(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employee: Employee) => {
    await api.createEmployee(employee);
    fetchEmployees();
  };

  const editEmployee = async (id: number, employee: Employee) => {
    await api.updateEmployee(id, employee);
    fetchEmployees();
  };

  const removeEmployee = async (id: number) => {
    await api.deleteEmployee(id);
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, loading, error, fetchEmployees, addEmployee, editEmployee, removeEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error('useEmployeeContext must be used within EmployeeProvider');
  return context;
};