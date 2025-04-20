import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css'],
})
export class BookingDetailsComponent {
  bookings: any = []
  constructor(private bookingService: BookingService) {}
  customer_id = Number(sessionStorage.getItem('user_id'));
  ngOnInit(): void {
    this.bookingService
      .getBookingDetails(this.customer_id)
      .subscribe((response: any) => {
        if (response.success) {
          this.bookings = response.bookings;
          console.log(response);
        } else {
          console.log(response);
        }
      });
  }
}
// {
//   "id": 17,
//   "customer_id": 1,
//   "driver_id": null,
//   "pickup_location": "d",
//   "dropoff_location": "d",
//   "booking_status": "pending",
//   "fare": "620.00",
//   "payment_status": "pending",
//   "created_at": "2025-04-19T18:52:03.000Z",
//   "pickup_date": "2025-04-25T18:30:00.000Z",
//   "weight": 2000
// },
