import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { ProfileService } from 'src/app/services/profile.service';
declare var window: any;

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {

  constructor(private bookingService: BookingService,
    private profileService: ProfileService
  ){}
  bookings:any;
  ngOnInit(): void {
    this.getAllBookingDetails();
  }

  getAllBookingDetails(){
    this.bookingService
    .getAllBookingDetails()
    .subscribe((response: any) => {
      if (response.success) {
        this.bookings = response.bookings.sort((a: any, b: any) => {
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

  customer_details!:any;
  onBooking(customer_id: number, driver_id:number){
    const modal = new window.bootstrap.Modal(
      document.getElementById('bookingModal')
    );
    modal.show();
    console.log(customer_id);
    this.profileService.getUserById(customer_id).subscribe((response: any) => {
      if (response.success) {
        this.customer_details = response.user;
        console.log(response);
      } else {
        console.log(response);
      }
    });
    
    this.profileService.getDriverById(driver_id).subscribe((response: any) => {
      if (response.success) {
        this.customer_details = response.user;
        console.log(response);
      } else {
        console.log(response);
      }
    });
  }
}
