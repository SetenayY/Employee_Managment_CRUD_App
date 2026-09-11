import React, { useState, useEffect } from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import type { Employee } from '../types/employee';

interface EmployeeFormProps {
  employeeToEdit?: Employee | null;
  clearEdit: () => void;
}

const initialFormState: Employee = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  hireDate: '',
  jobId: 0,
  salary: 0,
  managerId: null,
  departmentId: 0,
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employeeToEdit, clearEdit }) => {
  const { addEmployee, editEmployee } = useEmployeeContext();
  const [formData, setFormData] = useState<Employee>(initialFormState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (employeeToEdit) {
      setFormData(employeeToEdit);
    } else {
      setFormData(initialFormState);
    }
  }, [employeeToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let parsedValue: string | number | null = value;
    
    if (['jobId', 'salary', 'departmentId'].includes(name)) {
      parsedValue = value === '' ? 0 : Number(value);
    } else if (name === 'managerId') {
      parsedValue = value === '' ? null : Number(value);
    }

    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();

  setErrorMessage(null);

  try {
    if (formData.id) {
      await editEmployee(formData.id, formData);
    } else {
      await addEmployee(formData);
    }

    setFormData(initialFormState);
    clearEdit();

  } catch (error: any) {
    console.error("Error saving employee:", error);

    const backendMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      '';
    if (
      backendMessage.toLowerCase().includes('manager') ||
      backendMessage.toLowerCase().includes('managerid') ||
      backendMessage.toLowerCase().includes('employee not found')
    ) {
      setErrorMessage(
        'Employee not updated. The entered manager ID does not exist.'
      );
    } else {
      setErrorMessage(
        backendMessage || 'Employee could not be updated.'
      );
    }
  }
};

  return (
    <div style={{ border: '1px solid #cccccc', padding: '20px', borderRadius: '8px', marginBottom: '20px', maxWidth: '1000px' }}>
      <style>{`
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
        .form-field {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .form-field label {
          min-width: 110px;
          font-weight: 500;
          font-size: 14px;
        }
        .form-field input {
          width: 160px;
          padding: 6px;
        }
      `}</style>

      <h3>{formData.id ? 'Update Employee' : 'Create Employee'}</h3>
      {errorMessage && (
      <div
        style={{
          color: '#721c24',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '15px',
        }}
      >
        {errorMessage}
      </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px', gridTemplateColumns: '1fr 1fr' }}>
        
        <div className="form-field"><label>First Name:</label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required /></div>
        <div className="form-field"><label>Last Name:</label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required /></div>
        <div className="form-field"><label>Email:</label><input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
        <div className="form-field"><label>Phone Number:</label><input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required /></div>
        <div className="form-field"><label>Hire Date:</label><input type="date" name="hireDate" value={formData.hireDate} onChange={handleChange} required /></div>
        <div className="form-field"><label>Job ID:</label><input type="number" name="jobId" value={formData.jobId || ''} onChange={handleChange} required /></div>
        <div className="form-field"><label>Salary:</label><input type="number" name="salary" value={formData.salary || ''} onChange={handleChange} required /></div>
        <div className="form-field"><label>Department ID:</label><input type="number" name="departmentId" value={formData.departmentId || ''} onChange={handleChange} required /></div>
        <div className="form-field"><label>Manager ID:</label><input type="number" name="managerId" placeholder="optional" value={formData.managerId || ''} onChange={handleChange} /></div>

        <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={{ padding: '6px 16px' }}>{formData.id ? 'Update' : 'Save'}</button> 
          {formData.id && (
            <button type="button" onClick={() => { setFormData(initialFormState); clearEdit(); }} style={{ padding: '6px 16px' }}>
              Cancel
            </button>
          )}
        </div>
        
      </form>
    </div>
  );
};

export default EmployeeForm;