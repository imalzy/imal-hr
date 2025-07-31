import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardEmployee } from '../../../shared/card/card/card';
import { EmployeeFilter } from '../../../shared/filters/employee-filter/employee-filter';

import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import {
  EmployeeService,
  IEmployee,
} from '../../../services/employee/employee';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [
    CardEmployee,
    CommonModule,
    EmployeeFilter,
    MatPaginatorModule,
    MatPaginator,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  private employeeService = inject(EmployeeService);

  private pageIndex$ = new BehaviorSubject<number>(0);
  private pageSize$ = new BehaviorSubject<number>(5);

  employees: IEmployee[] = [];
  totalLength = 0;

  readonly paginatedEmployees$ = combineLatest([
    this.employeeService.filteredEmployees$,
    this.pageIndex$,
    this.pageSize$,
  ]).pipe(
    map(([employees, pageIndex, pageSize]) => {
      this.employees = employees;
      this.totalLength = employees.length;

      const start = pageIndex * pageSize;
      const end = start + pageSize;

      return employees.slice(start, end);
    })
  );

  readonly pageSizeOptions = [5, 10, 20];

  onPageChange(event: PageEvent): void {
    this.pageIndex$.next(event.pageIndex);
    this.pageSize$.next(event.pageSize);
  }
}
