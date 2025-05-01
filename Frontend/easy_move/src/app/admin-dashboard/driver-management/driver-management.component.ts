import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverService } from 'src/app/services/driver.service';
import { ProfileService } from 'src/app/services/profile.service';
declare var window: any;

@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.css'],
})
export class DriverManagementComponent {
    signupForm!: FormGroup;
    isPasswordMatch: boolean = false;
    isLoader: boolean = false;
    email!: string;
    errorMessage: string = ''; 
  constructor(
    private driverService: DriverService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}
  drivers!: any;
  ngOnInit(): void {
    this.getAllDrivers();
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
  }

  getAllDrivers() {
    this.driverService.getAllDrivers().subscribe((response: any) => {
      if (response.success) {
        this.drivers = response.drivers.sort((a: any, b: any) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
        console.log(response);
      } else {
        console.log(response);
      }
    });
  }

  onAdd() {
    const modal = new window.bootstrap.Modal(
      document.getElementById('driverModal')
    );
    modal.show();
  }
}
