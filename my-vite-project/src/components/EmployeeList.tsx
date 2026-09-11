import React from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import type { Employee } from '../types/employee';

interface EmployeeListProps {
  onEdit: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onEdit }) => {
  const { employees, loading, error, removeEmployee } = useEmployeeContext();

  if (loading) return <p>...Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error!: {error}</p>;

  const handleDelete = (id: number | undefined) => {
    if (id && window.confirm('Do you confirm deletion of this employee?')) {
      removeEmployee(id);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>List of Employees</h3>
      
      {employees.length === 0 ? (
        <p>No registered employees.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#676769af' }}>
              <th style={{ padding: '10px', borderBottom: '2px solid #ccc' }}>ID</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ccc' }}>First and Last Name</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ccc' }}>Email</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ccc' }}>Department</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ccc' }}>Manager ID</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ccc' }}>Operations</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{emp.id}</td>
                <td style={{ padding: '10px' }}>{emp.firstName} {emp.lastName}</td>
                <td style={{ padding: '10px' }}>{emp.email}</td>
                <td style={{ padding: '10px' }}>{emp.departmentId}</td>
                <td style={{ padding: '10px' }}>{emp.managerId || '-'}</td>
                <td style={{ padding: '10px' }}>
                  <button 
                    onClick={() => onEdit(emp)} 
                    style={{ marginRight: '10px', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(emp.id)} 
                    style={{ color: 'white', backgroundColor: '#c32020e5', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;