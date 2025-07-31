import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import {
  EmployeeService,
  IEmployee,
} from '../../../services/employee/employee';
import { switchMap, tap } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CurrencyPipe } from '../../../pipes/currency-pipe';

@Component({
  selector: 'app-detail',
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
    CurrencyPipe,
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);

  id!: number;
  employee: IEmployee | undefined;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params: any) => {
          const id = Number(params.get('id'));
          this.id = id;
          return this.employeeService.getById(id);
        })
      )
      .subscribe({
        next: (employee) => {
          this.employee = employee;
        },
        error: (err) => {
          console.error('Failed to fetch employee', err);
        },
      });
  }

  getStatusColor(status: string | undefined): string {
    switch (status) {
      case 'active':
        return 'status-online';
      case 'inactive':
        return 'status-inactive';
      case 'busy':
        return 'status-busy';
      case 'away':
        return 'status-away';
      case 'offline':
        return 'status-offline';
      default:
        return '';
    }
  }

  getStatusText(status: string | undefined): string {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'inactive':
        return 'Tidak Aktif';
      case 'busy':
        return 'Sibuk';
      case 'away':
        return 'Away';
      case 'offline':
        return 'Cuti';
      default:
        return '';
    }
  }

  getNameAvatar(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  handleEditEmployee(): void {
      this.router.navigate(['employee', 'edit', this.id]);
  }
}
