import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BookingService } from 'src/app/services/booking.service';
declare var window: any;

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {
bookings: any = [];
  constructor(private bookingService: BookingService, private toast: NgToastService) {}
  driver_id = Number(sessionStorage.getItem('user_id'));

  ngOnInit(): void {
    this.getBookingDetails();
  }

  getBookingDetails() {
    this.bookingService
      .getBookingDetailsForDriver(this.driver_id)
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
  onCompleted(booking_id: number) {
    const modal = new window.bootstrap.Modal(
      document.getElementById('cancelModal')
    );
    modal.show();
    this.bookingId = booking_id;
  }

  onYes() {
    if (this.bookingId !== undefined) {
      this.bookingService
        .completeBooking(this.bookingId)
        .subscribe((response: any) => {
          if (response.success) {
            this.getBookingDetails();
            this.toast.success({ detail: "SUCCESS", summary: 'Booking Completed Successfully!', duration: 5000, position: 'topRight' });
          } else {
            this.toast.error({ detail: "Error! please try again!", summary: 'Failed To Update', duration: 5000, position: 'topRight' });
          }
        });
      }else{
        this.toast.error({ detail: "Error! please try again!", summary: 'Failed To Update', duration: 5000, position: 'topRight' });
      }
      const modalElement = document.getElementById('cancelModal');
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      modal.hide();
  }
}
