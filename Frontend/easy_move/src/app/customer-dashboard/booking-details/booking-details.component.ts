import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BookingService } from 'src/app/services/booking.service';
declare var window: any;

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css'],
})
export class BookingDetailsComponent {
  bookings: any = [];
  constructor(private bookingService: BookingService,
    private toast: NgToastService
  ) {}
  customer_id = Number(sessionStorage.getItem('user_id'));

  ngOnInit(): void {
    this.getBookingDetails();
  }

  getBookingDetails() {
    this.bookingService
      .getBookingDetails(this.customer_id)
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
  bookingId!: number;
  onCancel(booking_id: number) {
    const modal = new window.bootstrap.Modal(
      document.getElementById('cancelModal')
    );
    modal.show();
    this.bookingId = booking_id;
  }

  onYes() {
    if (this.bookingId !== undefined) {
      this.bookingService
        .cancelBooking(this.bookingId)
        .subscribe((response: any) => {
          if (response.success) {
            this.toast.success({ detail: "SUCCESS", summary: 'Booking Canceled Successfully', duration: 5000, position: 'topRight' });
            // Update the bookings array dynamically
            this.getBookingDetails();
            // Hide the modal after successful cancel
            const modalElement = document.getElementById('cancelModal');
            const modal = window.bootstrap.Modal.getInstance(modalElement);
            modal.hide();
          } else {
            this.toast.error({ detail: "Error! please try again!", summary: 'Failed To Cancel Booking', duration: 5000, position: 'topRight' });
          }
        });
    }
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
