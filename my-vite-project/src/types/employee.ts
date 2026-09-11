export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  hireDate: string;
  jobId: number;
  salary: number;
  managerId: number | null;
  departmentId: number;
}