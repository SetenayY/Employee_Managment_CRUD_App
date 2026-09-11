import React, { useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import type { Employee } from './types/employee';

const App: React.FC = () => {
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const handleEdit = (employee: Employee) => {
    setEmployeeToEdit(employee);
    // Scroll to top so the user sees the form being populated
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearEdit = () => {
    setEmployeeToEdit(null);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#2d2c2c' }}>Employee Manager</h1>
      
      <EmployeeForm 
        employeeToEdit={employeeToEdit} 
        clearEdit={clearEdit} 
      />
      
      <EmployeeList 
        onEdit={handleEdit} 
      />
    </div>
  );
};

export default App;