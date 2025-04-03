import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
  private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+,.:;<=>?[\]^{|}~]).{8,}$/),Validators.minLength(8)]]
    });
  }

  onLogin() {
    const formData = { ...this.loginForm.value };
    this.profileService.login(formData).subscribe((response: any) => {
      if (response.success && response != null) {
        if (response.user.role == "driver") {
          this.router.navigate(['/driver-dashboard']);
        }
        else if (response.user.role == "customer") {
          this.router.navigate(['/customer-dashboard']);
        }
      }
      else {
        this.router.navigate(['/login']);
      }
    }) 
  }
}
