import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.css'],
})
export class CustomerSignupComponent {
  signupForm!: FormGroup;
  isPasswordMatch: boolean = false;
  isLoader: boolean = false;
  email!: string;
  errorMessage: string = '';  // Store a single error message

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
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
      repassword: ['', Validators.required],
      role: ['Customer'],
    });

    this.signupForm.valueChanges.subscribe(() => {
      const Password = this.signupForm.get('password')?.value;
      const reEnterPassword = this.signupForm.get('repassword')?.value;
      if (Password !== reEnterPassword) {
        this.signupForm.setErrors({ customError: true });
        this.isPasswordMatch = true;
      } else {
        this.isPasswordMatch = false;
        this.signupForm.setErrors(null);
      }
    });
  }

  validateSignup() {
    this.errorMessage = '';  // Reset previous error message

    const controls = this.signupForm.controls;

    // Check Name
    if (controls['name'].errors?.['required']) {
      this.errorMessage = 'Name is required';
      return;
    }

    // Check Email
    if (controls['email'].errors?.['required']) {
      this.errorMessage = 'Email is required';
      return;
    } else if (controls['email'].errors?.['email']) {
      this.errorMessage = 'Enter a valid email';
      return;
    }

    // Check Phone
    if (controls['phone'].errors?.['required']) {
      this.errorMessage = 'Mobile number is required';
      return;
    } else if (controls['phone'].errors?.['pattern']) {
      this.errorMessage = 'Mobile number must be 10 digits';
      return;
    }

    // Check Password
    if (controls['password'].errors?.['required']) {
      this.errorMessage = 'Password is required';
      return;
    } else {
      if (controls['password'].errors?.['minlength']) {
        this.errorMessage = 'Password must be at least 8 characters';
        return;
      }
      if (controls['password'].errors?.['pattern']) {
        this.errorMessage = 'Password must contain uppercase, lowercase, number, and special character';
        return;
      }
    }

    // Check Confirm Password
    if (controls['repassword'].errors?.['required']) {
      this.errorMessage = 'Confirm Password is required';
      return;
    }

    if (
      !controls['repassword'].errors?.['required'] &&
      controls['password'].value !== controls['repassword'].value
    ) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Proceed to check email existence via backend
    this.profileService.checkEmail(this.signupForm.value.email).subscribe(
      (res: any) => {
        if (res.success) {
          // Proceed if email is not taken
          this.onSignup();
        } else {
          // Show backend error message
          this.errorMessage = res.message || 'Email is already in use';
        }
      },
      (err) => {
        this.errorMessage = err.error?.message || 'Something went wrong while checking email';
      }
    );
  }

  onSignup() {
    this.isLoader = true;
    const formData = { ...this.signupForm.value };
    delete formData.repassword;

    this.profileService.customerSignUp(formData).subscribe(
      (response: any) => {
        this.isLoader = false;
        if (response.success) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Signup failed. Please try again.';
        }
      },
      (err) => {
        this.isLoader = false;
        this.errorMessage = err.error?.message || 'Server error during signup';
      }
    );
  }
}
