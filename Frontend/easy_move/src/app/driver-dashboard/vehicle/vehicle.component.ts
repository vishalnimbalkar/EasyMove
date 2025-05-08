import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
  vehicle_id!:number;
  vehicleUpdateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService,
    private toast: NgToastService
  ) {}
  
  ngOnInit() {
    const driver_id = Number(sessionStorage.getItem('user_id'));
    this.getAllVehicles();
    this.vehicleForm = this.fb.group({
      vehicle_type: ['', Validators.required],
      vehicle_number: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(100)]],
      driver_id: driver_id,
    });

    this.vehicleUpdateForm = this.fb.group({
      vehicle_type: ['', Validators.required],
      vehicle_number: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(100)]],
      id : ['']
    });
  }
  
  getAllVehicles() {
    const driver_id = Number(sessionStorage.getItem('user_id'));
    this.vehicleService
      .getVehiclesById(driver_id)
      .subscribe((response: any) => {
        if (response.success) {
          this.vehicles = response.vehicles.sort((a: any, b: any) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });
        } 
      });
  }

  submit() {
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
          this.toast.success({ detail: "SUCCESS", summary: 'Vehicle Added Successfully!', duration: 5000, position: 'topRight' });
        }else{
          this.toast.error({ detail: "Error! please try again!", summary: 'Failed To Add Vehicle', duration: 5000, position: 'topRight' });
        }
      },
      (err: any) => {
        this.toast.error({ detail: "Error! please try again!", summary: 'Failed To Add Vehicle', duration: 5000, position: 'topRight' });
      }
    );
    const modal = new window.bootstrap.Modal(
      document.getElementById('vehicleModal')
    );
    modal.hide();
    this.vehicleForm.reset();
  }

  onEdit(vehicle_id:number){
    const modal = new window.bootstrap.Modal(
      document.getElementById('updateVehicleModal')
    );
    modal.show();
    let vehicle!:any;
    this.vehicle_id = Number(vehicle_id);
    this.vehicleService
    .getByVehicleId(vehicle_id)
    .subscribe((response: any) => {
      if (response.success) {
        const vehicle = response.vehicle;
        this.vehicleUpdateForm.patchValue({
          id: vehicle_id,
          vehicle_type: vehicle.vehicle_type,
          vehicle_number: vehicle.vehicle_number,
          capacity: vehicle.capacity
        });
      }
    });
  }

  submitVehicle(){
    this.vehicleService
    .updateVehicle(this.vehicleUpdateForm.value)
    .subscribe((response: any) => {
      if (response.success) {
        this.getAllVehicles();
        this.toast.success({ detail: "SUCCESS", summary: 'Vehicle Updated Successfully!', duration: 5000, position: 'topRight' });
      } 
      if(response.success===false){
        this.toast.error({ detail: "Error! please try again!", summary: 'Failed To Update', duration: 5000, position: 'topRight' });
      }
    });
  const modalElement = document.getElementById('updateVehicleModal');
  const modal = window.bootstrap.Modal.getInstance(modalElement);
  modal.hide();
  }
  

  onDelete(vehicle_id:number){
    this.vehicle_id = Number(vehicle_id);
    const modal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    modal.show();
  }

  onYes(){
    if (this.vehicle_id !== undefined) {
      this.vehicleService
      .deleteVehicle(this.vehicle_id)
      .subscribe((response: any) => {
        if (response.success) {
          this.getAllVehicles();
          this.toast.success({ detail: "SUCCESS", summary: 'Vehicle Deleted Successfully!', duration: 5000, position: 'topRight' });
        } else {
          this.toast.error({ detail: "Error! please try again!", summary: 'Failed To Delete', duration: 5000, position: 'topRight' });
        }
      });
    }else{
      this.toast.error({ detail: "Error! please try again!", summary: 'Failed To Delete', duration: 5000, position: 'topRight' });
    }
    const modalElement = document.getElementById('deleteModal');
    const modal = window.bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }

  onAdd() {
    const modal = new window.bootstrap.Modal(
      document.getElementById('vehicleModal')
    );
    modal.show();
  }
}
