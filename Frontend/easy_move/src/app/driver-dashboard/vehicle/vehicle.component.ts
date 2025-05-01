import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
declare var window: any;

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent {
  errorMessage!: string;
  vehicleForm!: FormGroup;
  vehicles: any = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService
  ) {}
  driver_id = Number(sessionStorage.getItem('user_id'));

  ngOnInit() {
    this.getAllVehicles();
    this.vehicleForm = this.fb.group({
      vehicle_type: ['', Validators.required],
      vehicle_number: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(100)]],
      driver_id: this.driver_id,
    });
  }

  getAllVehicles() {
    this.vehicleService
      .getVehiclesById(this.driver_id)
      .subscribe((response: any) => {
        if (response.success) {
          this.vehicles = response.vehicles.sort((a: any, b: any) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });
          console.log(response);
        } else {
          console.log(response);
        }
      });
  }
  submitBooking() {
    if (this.vehicleForm.invalid) {
      // Mark all fields as touched to show validation errors
      this.vehicleForm.markAllAsTouched();
      return; // don't open payment modal if form invalid
    }

    this.addVehicle(); // If valid, proceed to payment
  }

  addVehicle() {
    this.vehicleService.addVehicle(this.vehicleForm.value).subscribe(
      (response: any) => {
        if (response.success) {
          this.getAllVehicles();
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
    const modal = new window.bootstrap.Modal(
      document.getElementById('vehicleModal')
    );
    modal.hide();
  }

  onAdd() {
    const modal = new window.bootstrap.Modal(
      document.getElementById('vehicleModal')
    );
    modal.show();
  }
}
