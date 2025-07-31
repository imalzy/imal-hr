import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EmployeeService,
  IEmployee,
} from '../../../services/employee/employee';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit',
  imports: [
    MatCard,
    MatCardModule,
    MatIconModule,
    MatDivider,
    MatChipsModule,
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
})
export class Edit {
  private fb = inject(FormBuilder);
  private actRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  employeeId!: number;

  form: FormGroup = this.fb.group({
    id: [0],
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', Validators.required],
    basicSalary: [0, [Validators.required, Validators.min(0)]],
    status: ['active', Validators.required],
    group: ['', Validators.required],
    description: [''],
  });

  departments = [
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'IT',
  ];
  status = ['active', 'busy', 'away'];
  isLoading = false;

  ngOnInit(): void {
    this.actRoute.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          this.employeeId = id;
          return this.employeeService.getById(id);
        })
      )
      .subscribe({
        next: (employee: IEmployee) => {
          console.log('employee', employee);
          this.form.setValue({
            ...employee,
          });
        },
        error: () => {
          alert('Failed to load employee data');
        },
      });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedEmployee: IEmployee = {
        id: this.employeeId,
        ...this.form.value,
      };
      this.employeeService.update(this.employeeId, updatedEmployee);
    }
    this.router.navigate(['/employee']);
  }

  onCancel(): void {
    this.router.navigate(['/employee']);
  }
}
