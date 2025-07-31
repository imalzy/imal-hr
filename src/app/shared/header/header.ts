import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth/auth';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {}

  get hideAddButton(): boolean {
    const url = this.router.url;

    return (
      url.startsWith('/employee/detail') ||
      url.startsWith('/employee/edit') ||
      url.startsWith('/employee/create')
    );
  }

  navigateBack(): void {
    this.location.back();
  }

  handleAddEmployee(): void {
    this.router.navigate(['employee/create']);
  }

  handleLogout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
