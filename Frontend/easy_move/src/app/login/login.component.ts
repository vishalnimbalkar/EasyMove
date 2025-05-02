import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoader: boolean = false;
  errorMessage: string = ''; // Store error message

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+,.:;<=>?[\]^{|}~]).{8,}$/
          ),
          Validators.minLength(8),
        ],
      ],
    });
  }

  validateLogin() {
    this.errorMessage = ''; // Reset previous error message

    if (this.loginForm.invalid) {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();

      // Check for individual field errors
      const controls = this.loginForm.controls;

      if (controls['email'].errors?.['required']) {
        this.errorMessage = 'Email is required';
        controls['email'].setErrors({ required: true });
      } else if (controls['email'].errors?.['email']) {
        this.errorMessage = 'Enter a valid email';
        controls['email'].setErrors({ email: true });
      } else if (controls['password'].errors?.['required']) {
        this.errorMessage = 'Password is required';
        controls['password'].setErrors({ required: true });
      } else if (controls['password'].errors?.['minlength']) {
        this.errorMessage = 'Password must be at least 8 characters';
        controls['password'].setErrors({ minlength: true });
      } else if (controls['password'].errors?.['pattern']) {
        this.errorMessage = 'Password must contain uppercase, lowercase, number, and special character';
        controls['password'].setErrors({ pattern: true });
      }

      return; // If form is invalid, don't proceed with login
    }

    this.onLogin(); // If valid, proceed to login
  }

  onLogin() {
    const formData = { ...this.loginForm.value };
    this.isLoader = true;

    this.profileService.login(formData).subscribe((response: any) => {
      this.isLoader = false;

      if (response.success && response.user) {
        // Save full user object with role
        sessionStorage.setItem('user', JSON.stringify({'role': response.role}));
        sessionStorage.setItem('email', response.user.email);
        sessionStorage.setItem('user_id', response.user.id);
        sessionStorage.setItem('name', response.user.name);
        sessionStorage.setItem('phone', response.user.phone);

        // Role-based redirection
        const role = response.role;

        if (role === 'customer') {
          this.router.navigate(['/customer-dashboard']);
        } else if (role === 'driver') {
          this.router.navigate(['/driver-dashboard']);
        } else if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/login']); // fallback
        }
        this.toast.success({ detail: "SUCCESS", summary: 'Login Successfully', duration: 5000, position: 'topRight' });
      } else {
        this.toast.error({ detail: "Error! please try again!", summary: 'Invalid Credentials', duration: 5000, position: 'topRight' });
        this.errorMessage = 'Invalid login credentials'; // Handle login failure
        this.router.navigate(['/login']);
      }
    }, (err) => {
      this.isLoader = false;
      this.errorMessage = err.error?.message || 'Something went wrong during login';
      this.toast.error({ detail: "Error! please try again!", summary: 'Invalid Credentials', duration: 5000, position: 'topRight' });
    });
  }
}
