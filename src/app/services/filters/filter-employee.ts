import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterEmployeeService {
  private departments = ['HR', 'Sales', 'IT', 'Marketing', 'Engineering'];
  private statuses = ['active', 'inactive', 'pending'];

  private departmentSubject = new BehaviorSubject<string>('all');
  private statusSubject = new BehaviorSubject<string>('all');

  departments$ = this.departments;
  statuses$ = this.statuses;

  selectedDepartment$ = this.departmentSubject.asObservable();
  selectedStatus$ = this.statusSubject.asObservable();

  getSelectedFilters() {
    return {
      department: this.departmentSubject.value,
      status: this.statusSubject.value,
    };
  }

  setDepartment(dept: string) {
    this.departmentSubject.next(dept);
  }

  setStatus(status: string) {
    this.statusSubject.next(status);
  }

  clearFilters() {
    this.departmentSubject.next('all');
    this.statusSubject.next('all');
  }

  getActiveFilterCount(): number {
    return (
      (this.departmentSubject.value !== 'all' ? 1 : 0) +
      (this.statusSubject.value !== 'all' ? 1 : 0)
    );
  }
}
