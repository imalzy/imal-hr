import { TestBed } from '@angular/core/testing';

import { EmployeeService, IEmployee } from './employee';

describe('Employee', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an employee', (done) => {
    const newEmp: Omit<IEmployee, 'id'> = {
      name: 'John Doe',
      position: 'Engineer',
      department: '',
      email: '',
      phone: '',
      location: '',
      avatar: '',
      status: 'active',
      startDate: '',
      manager: '',
      employeeId: '',
      salary: ''
    };

    service.create(newEmp as IEmployee);

    service.getAll().subscribe((employees) => {
      expect(employees.length).toBe(1);
      expect(employees[0].name).toBe('John Doe');
      expect(employees[0].id).toBe(1);
      done();
    });
  });

  it('should return employee by ID', () => {
    service.create({
      id: 1, name: 'Alice', position: 'Manager',
      department: '',
      email: '',
      phone: '',
      location: '',
      avatar: '',
      status: 'active',
      startDate: '',
      manager: '',
      employeeId: '',
      salary: ''
    });
    const employee = service.getById(1);
    expect(employee).toBeTruthy();
    expect(employee?.name).toBe('Alice');
  });

  it('should update an employee', () => {
    service.create({
      id: 1, name: 'Bob', position: 'Dev',
      department: '',
      email: '',
      phone: '',
      location: '',
      avatar: '',
      status: 'active',
      startDate: '',
      manager: '',
      employeeId: '',
      salary: ''
    });

    service.update(1, { position: 'Senior Dev' });

    const updated = service.getById(1);
    expect(updated?.position).toBe('Senior Dev');
  });

  it('should delete an employee', () => {
    service.create({
      id: 1, name: 'Carol', position: 'Designer',
      department: '',
      email: '',
      phone: '',
      location: '',
      avatar: '',
      status: 'active',
      startDate: '',
      manager: '',
      employeeId: '',
      salary: ''
    });
    service.delete(1);

    const emp = service.getById(1);
    expect(emp).toBeUndefined();
  });

  it('should generate incremental ID', () => {
    service.create({
      id: 0, name: 'A', position: 'Dev',
      department: '',
      email: '',
      phone: '',
      location: '',
      avatar: '',
      status: 'active',
      startDate: '',
      manager: '',
      employeeId: '',
      salary: ''
    });
    service.create({
      id: 0, name: 'B', position: 'QA',
      department: '',
      email: '',
      phone: '',
      location: '',
      avatar: '',
      status: 'active',
      startDate: '',
      manager: '',
      employeeId: '',
      salary: ''
    });

    const all = service['employeeSubject'].value;
    expect(all[0].id).toBe(1);
    expect(all[1].id).toBe(2);
  });
});
