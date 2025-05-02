import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-driver-signup',
  templateUrl: './driver-signup.component.html',
  styleUrls: ['./driver-signup.component.css']
})
export class DriverSignupComponent {
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
    private toast: NgToastService
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
      role: ['driver'],
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
          this.toast.error({ detail: "Error! please try again!", summary: 'Email is already in use', duration: 5000, position: 'topRight' });
        }
      },
      (err:any) => {
        this.errorMessage = err.error?.message || 'Something went wrong while checking email';
      }
    );
  }

  onSignup() {
    this.isLoader = true;
    const formData = { ...this.signupForm.value };
    delete formData.repassword;

    this.profileService.driverSignUp(formData).subscribe(
      (response: any) => {
        this.isLoader = false;
        if (response.success) {
          this.router.navigate(['/login']);
          this.toast.success({ detail: "SUCCESS", summary: 'Signup Successfully', duration: 5000, position: 'topRight' });
        } else {
          this.errorMessage = 'Signup failed. Please try again.';
        this.toast.error({ detail: "Error! please try again!", summary: 'Failed To Signup', duration: 5000, position: 'topRight' });
        }
      },
      (err:any) => {
        this.isLoader = false;
        this.errorMessage = err.error?.message || 'Server error during signup';
        this.toast.error({ detail: "Error! please try again!", summary: 'Server Error', duration: 5000, position: 'topRight' });
      }
    );
  }
}
