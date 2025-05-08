import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css']
})
export class VehicleManagementComponent {
  vehicles: any=[];
 constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private toast: NgToastService
  ) {}
  
  ngOnInit() {
this.getAllVehicles();
  }

  getAllVehicles() {
    this.vehicleService
      .getAllVehicles()
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
}
