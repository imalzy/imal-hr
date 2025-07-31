import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { FilterEmployeeService } from '../filters/filter-employee';

export interface IEmployee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private filterService = inject(FilterEmployeeService);

  private employees: IEmployee[] = [
  {
    id: 1,
    username: 'sarah.johnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    birthDate: '1990-05-15', 
    basicSalary: 95000,
    status: 'active',
    group: 'Engineering',
    description: 'Experienced frontend developer with expertise in React, TypeScript, and modern web technologies. Passionate about creating user-friendly interfaces and mentoring junior developers.'
  },
  {
    id: 2,
    username: 'michael.chen',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@company.com',
    birthDate: '1988-07-22',
    basicSalary: 110000,
    status: 'busy',
    group: 'Product',
    description: 'Product manager with experience in agile development and product lifecycle management.'
  },
  {
    id: 3,
    username: 'emily.rodriguez',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@company.com',
    birthDate: '1992-03-10',
    basicSalary: 85000,
    status: 'active',
    group: 'Design',
    description: 'Creative UX designer focused on user-centered design principles and accessibility.'
  },
  {
    id: 4,
    username: 'david.kumar',
    firstName: 'David',
    lastName: 'Kumar',
    email: 'david.kumar@company.com',
    birthDate: '1989-11-18',
    basicSalary: 90000,
    status: 'away',
    group: 'Engineering',
    description: 'Backend developer specializing in scalable systems and database architecture.'
  },
  {
    id: 5,
    username: 'lisa.thompson',
    firstName: 'Lisa',
    lastName: 'Thompson',
    email: 'lisa.thompson@company.com',
    birthDate: '1985-09-05',
    basicSalary: 120000,
    status: 'active',
    group: 'Marketing',
    description: 'Marketing director with expertise in digital marketing strategies and brand management.'
  },
  {
    id: 6,
    username: 'james.wilson',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@company.com',
    birthDate: '1987-12-30',
    basicSalary: 105000,
    status: 'active',
    group: 'Engineering',
    description: 'DevOps engineer focused on CI/CD pipelines and cloud infrastructure.'
  },
  {
    id: 7,
    username: 'anna.martinez',
    firstName: 'Anna',
    lastName: 'Martinez',
    email: 'anna.martinez@company.com',
    birthDate: '1991-04-25',
    basicSalary: 88000,
    status: 'active',
    group: 'Sales',
    description: 'Sales manager with strong customer relationship skills and sales strategy expertise.'
  },
  {
    id: 8,
    username: 'tom.anderson',
    firstName: 'Tom',
    lastName: 'Anderson',
    email: 'tom.anderson@company.com',
    birthDate: '1986-08-12',
    basicSalary: 72000,
    status: 'away',
    group: 'HR',
    description: 'HR specialist focused on employee relations and talent acquisition.'
  },
  {
    id: 9,
    username: 'rachel.green',
    firstName: 'Rachel',
    lastName: 'Green',
    email: 'rachel.green@company.com',
    birthDate: '1993-01-20',
    basicSalary: 78000,
    status: 'active',
    group: 'Finance',
    description: 'Financial analyst with expertise in budgeting, forecasting, and financial modeling.'
  },
  {
    id: 10,
    username: 'kevin.liu',
    firstName: 'Kevin',
    lastName: 'Liu',
    email: 'kevin.liu@company.com',
    birthDate: '1990-10-08',
    basicSalary: 82000,
    status: 'busy',
    group: 'Engineering',
    description: 'QA engineer specializing in automated testing and quality assurance processes.'
  },
  {
    id: 11,
    username: 'sofia.garcia',
    firstName: 'Sofia',
    lastName: 'Garcia',
    email: 'sofia.garcia@company.com',
    birthDate: '1994-06-14',
    basicSalary: 65000,
    status: 'active',
    group: 'Marketing',
    description: 'Content writer creating engaging marketing materials and brand messaging.'
  },
  {
    id: 12,
    username: 'daniel.brown',
    firstName: 'Daniel',
    lastName: 'Brown',
    email: 'daniel.brown@company.com',
    birthDate: '1988-02-28',
    basicSalary: 75000,
    status: 'active',
    group: 'IT',
    description: 'System administrator managing network infrastructure and IT support systems.'
  }
];

  private employeeSubject = new BehaviorSubject<IEmployee[]>(this.employees);
  public employee$ = this.employeeSubject.asObservable();

  filteredEmployees$ = combineLatest([
    this.employee$,
    this.filterService.selectedDepartment$,
    this.filterService.selectedStatus$,
  ]).pipe(
    map(([employees, department, status]) => {
      return employees.filter((emp) => {
        const deptMatch = department === 'all' || emp.group === department;
        const statusMatch = status === 'all' || emp.status === status;
        return deptMatch && statusMatch;
      });
    })
  );

  getAll(): Observable<IEmployee[]> {
    return this.employee$;
  }

  getById(id: number): Observable<IEmployee> {
    const employee = this.employeeSubject.value.find((emp) => emp.id === id);
    return employee
      ? of(employee)
      : throwError(() => new Error('Employee not found'));
  }

  create(employee: IEmployee): void {
    const newEmployee = { ...employee, id: this.generateId() };
    const updated = [...this.employeeSubject.value, newEmployee];
    this.employeeSubject.next(updated);
  }

  update(id: number, updatedData: Partial<IEmployee>): void {
    const updated = this.employeeSubject.value.map((emp) =>
      emp.id === id ? { ...emp, ...updatedData } : emp
    );
    this.employeeSubject.next(updated);
  }

  delete(id: number): void {
    const updated = this.employeeSubject.value.filter((emp) => emp.id !== id);
    this.employeeSubject.next(updated);
  }

  private generateId(): number {
    const ids = this.employeeSubject.value.map((e) => e.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }
}
