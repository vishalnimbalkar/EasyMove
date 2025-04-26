import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
declare var window: any;

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
          this.bookings =response.bookings.sort((a: any, b: any) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          });
          console.log(response);
        } else {
          console.log(response);
        }
      });
  }
  bookingId!:number;
  onCancel(booking_id:number){
    const modal = new window.bootstrap.Modal(document.getElementById('cancelModal'));
    modal.show();
    this.bookingId = booking_id;
  }
  onYes(){
    if(this.bookingId!==undefined){
      this.cancelBooking(this.bookingId)
    }
  }
  cancelBooking(booking_id: number) {
      this.bookingService.cancelBooking(booking_id).subscribe((response: any) => {
        if (response.success) {
          this.bookings = this.bookings.filter((b:any) => b.booking_id !== booking_id);
          const modal = new window.bootstrap.Modal(document.getElementById('cancelModal'));
    modal.hide();
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
