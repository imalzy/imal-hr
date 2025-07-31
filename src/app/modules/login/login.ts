import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  fb = inject(FormBuilder);
  router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  isLoading = false;
  showPassword = false;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      console.log('Logged in with', this.loginForm.value);
      this.router.navigate(['/employee'])
    }, 1500);
  }
}
