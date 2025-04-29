import { Component } from '@angular/core';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.css']
})
export class DriverManagementComponent {
 constructor(private driverService: DriverService) {}
  drivers!: any;
  ngOnInit(): void {
    this.getAllDrivers();
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
}
