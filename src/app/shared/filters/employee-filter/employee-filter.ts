import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FilterEmployeeService } from '../../../services/filters/filter-employee';

@Component({
  selector: 'app-employee-filter',
  imports: [
    MatCard,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    TitleCasePipe,
  ],
  templateUrl: './employee-filter.html',
  styleUrl: './employee-filter.scss',
})
export class EmployeeFilter {
  filterService = inject(FilterEmployeeService);

  departments = this.filterService.departments$;
  statuses = this.filterService.statuses$;

  selectedDepartment = this.filterService.getSelectedFilters().department;
  selectedStatus = this.filterService.getSelectedFilters().status;

  get activeFiltersCount() {
    return this.filterService.getActiveFilterCount();
  }

  onDepartmentChange(value: string) {
    this.filterService.setDepartment(value);
  }

  onStatusChange(value: string) {
    this.filterService.setStatus(value);
  }

  onClearFilters() {
    this.filterService.clearFilters();
    this.selectedDepartment = 'all';
    this.selectedStatus = 'all';
  }
}
