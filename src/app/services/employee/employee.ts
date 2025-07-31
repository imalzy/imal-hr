import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { FilterEmployeeService } from '../filters/filter-employee';

export interface IEmployee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  status: 'active' | 'busy' | 'away';
  startDate: string;
  manager: string;
  employeeId: string;
  salary: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private filterService = inject(FilterEmployeeService);

  private employees: IEmployee[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Senior Frontend Developer',
      department: 'Engineering',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      avatar: '',
      status: 'active',
      startDate: '2021-03-15',
      manager: 'John Smith',
      employeeId: 'EMP001',
      salary: '$95,000',
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Product Manager',
      department: 'Product',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      avatar: '',
      status: 'busy',
      startDate: '2020-08-10',
      manager: 'Lisa Anderson',
      employeeId: 'EMP002',
      salary: '$110,000',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'UX Designer',
      department: 'Design',
      email: 'emily.rodriguez@company.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      avatar: '',
      status: 'active',
      startDate: '2022-01-20',
      manager: 'David Kim',
      employeeId: 'EMP003',
      salary: '$85,000',
    },
    {
      id: 4,
      name: 'David Kumar',
      position: 'Backend Developer',
      department: 'Engineering',
      email: 'david.kumar@company.com',
      phone: '+1 (555) 456-7890',
      location: 'Seattle, WA',
      avatar: '',
      status: 'away',
      startDate: '2021-11-05',
      manager: 'John Smith',
      employeeId: 'EMP004',
      salary: '$90,000',
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      position: 'Marketing Director',
      department: 'Marketing',
      email: 'lisa.thompson@company.com',
      phone: '+1 (555) 567-8901',
      location: 'Chicago, IL',
      avatar: '',
      status: 'active',
      startDate: '2019-06-12',
      manager: 'Robert Wilson',
      employeeId: 'EMP005',
      salary: '$120,000',
    },
    {
      id: 6,
      name: 'James Wilson',
      position: 'DevOps Engineer',
      department: 'Engineering',
      email: 'james.wilson@company.com',
      phone: '+1 (555) 678-9012',
      location: 'Denver, CO',
      avatar: '',
      status: 'active',
      startDate: '2020-02-28',
      manager: 'John Smith',
      employeeId: 'EMP006',
      salary: '$105,000',
    },
    {
      id: 7,
      name: 'Anna Martinez',
      position: 'Sales Manager',
      department: 'Sales',
      email: 'anna.martinez@company.com',
      phone: '+1 (555) 789-0123',
      location: 'Miami, FL',
      avatar: '',
      status: 'active',
      startDate: '2021-07-12',
      manager: 'Robert Wilson',
      employeeId: 'EMP007',
      salary: '$88,000',
    },
    {
      id: 8,
      name: 'Tom Anderson',
      position: 'HR Specialist',
      department: 'HR',
      email: 'tom.anderson@company.com',
      phone: '+1 (555) 890-1234',
      location: 'Portland, OR',
      avatar: '',
      status: 'away',
      startDate: '2020-11-30',
      manager: 'Lisa Anderson',
      employeeId: 'EMP008',
      salary: '$72,000',
    },
    {
      id: 9,
      name: 'Rachel Green',
      position: 'Financial Analyst',
      department: 'Finance',
      email: 'rachel.green@company.com',
      phone: '+1 (555) 901-2345',
      location: 'Boston, MA',
      avatar: '',
      status: 'active',
      startDate: '2022-04-18',
      manager: 'David Kim',
      employeeId: 'EMP009',
      salary: '$78,000',
    },
    {
      id: 10,
      name: 'Kevin Liu',
      position: 'QA Engineer',
      department: 'Engineering',
      email: 'kevin.liu@company.com',
      phone: '+1 (555) 012-3456',
      location: 'San Jose, CA',
      avatar: '',
      status: 'busy',
      startDate: '2021-09-20',
      manager: 'John Smith',
      employeeId: 'EMP010',
      salary: '$82,000',
    },
    {
      id: 11,
      name: 'Sofia Garcia',
      position: 'Content Writer',
      department: 'Marketing',
      email: 'sofia.garcia@company.com',
      phone: '+1 (555) 123-4567',
      location: 'Los Angeles, CA',
      avatar: '',
      status: 'active',
      startDate: '2022-02-14',
      manager: 'Lisa Thompson',
      employeeId: 'EMP011',
      salary: '$65,000',
    },
    {
      id: 12,
      name: 'Daniel Brown',
      position: 'System Administrator',
      department: 'IT',
      email: 'daniel.brown@company.com',
      phone: '+1 (555) 234-5678',
      location: 'Phoenix, AZ',
      avatar: '',
      status: 'active',
      startDate: '2020-05-25',
      manager: 'James Wilson',
      employeeId: 'EMP012',
      salary: '$75,000',
    },
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
        const deptMatch = department === 'all' || emp.department === department;
        const statusMatch = status === 'all' || emp.status === status;
        return deptMatch && statusMatch;
      });
    })
  );

  getAll(): Observable<IEmployee[]> {
    return this.employee$;
  }

  getById(id: number): IEmployee | undefined {
    return this.employeeSubject.value.find((emp) => emp.id === id);
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
