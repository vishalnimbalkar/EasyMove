import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BookingService } from 'src/app/services/booking.service';
import { DriverService } from 'src/app/services/driver.service';
import { ProfileService } from 'src/app/services/profile.service';
declare var window: any;

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css'],
})
export class BookingDetailsComponent {
  drivers: any = [];
  constructor(
    private bookingService: BookingService,
    private profileService: ProfileService,
    private driverService: DriverService,
    private toast: NgToastService
  ) {}
  bookings: any;
  customers: any;
  selectedDriverId!: number ;
  bookingId!: number ;

  ngOnInit(): void {
    this.getAllBookingDetails();
    this.getAllDrivers();
  }

  getAllBookingDetails() {
    this.bookingService.getAllBookingDetails().subscribe((response: any) => {
      if (response.success) {
        this.bookings = response.bookings.sort((a: any, b: any) => {
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
  customer: any = null;
  driver: any = null;
  onBooking(customer_id: number, driver_id: number, booking_id: number) {
    const modal = new window.bootstrap.Modal(
      document.getElementById('assignDriverModal')
    );
    modal.show();
    this.bookingId= booking_id;
    // Fetch customer
    this.profileService.getUserById(customer_id).subscribe((response: any) => {
      if (response.success) {
        this.customer = response.user;
        console.log('Customer:', this.customer);
      }
    });

    // Fetch driver
    this.profileService.getDriverById(driver_id).subscribe((response: any) => {
      if (response.success) {
        this.driver = response.user;
        console.log('Driver:', this.driver);
      }
    });
  }

  assignDriver(){
    const data = {
      'booking_id' : this.selectedDriverId,
      'driver_id' : this.bookingId
    }
    this.bookingService.assignDriver(data).subscribe((response: any) => {
      if (response.success) {
        this.toast.success({ detail: "SUCCESS", summary: 'Driver Assigned Successfully', duration: 5000, position: 'topRight' });
      }else{
        this.toast.error({ detail: "Error! please try again!", summary: 'Failed To Assigned Failed', duration: 5000, position: 'topRight' });
      }
      this.selectedDriverId = -1;
    });
  }
}
