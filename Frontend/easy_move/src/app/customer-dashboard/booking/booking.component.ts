import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BookingService } from 'src/app/services/booking.service';
import { PaymentService } from 'src/app/services/payment.service';
declare var window: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  // Fare = Base Fare + (Distance × Rate per KM) + (Time × Rate per Hour) + Extra Charges (if any)
  bookingForm!: FormGroup;
  fare: number = 0;
  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private paymentService: PaymentService,
    private router:Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      pickup_location: ['', Validators.required],
      dropoff_location: ['', Validators.required],
      pickup_date: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(100)]],
      distance: ['', [Validators.required, Validators.min(1)]],
    });

    this.bookingForm.valueChanges.subscribe((val) => {
      const distance = Number(val.distance || 0);
      const weight = Number(val.weight || 0);
      this.fare = this.calculateFare(distance, weight);
    });
  }

  submitBooking() {
    if (this.bookingForm.invalid) {
      // Mark all fields as touched to show validation errors
      this.bookingForm.markAllAsTouched();
      return; // don't open payment modal if form invalid
    }
  
    this.openPaymentModal(); // If valid, proceed to payment
  }
  

  openPaymentModal() {
    const modal = new window.bootstrap.Modal(document.getElementById('paymentModal'));
    modal.show();
  }
  payNow() {
    const modalElement = document.getElementById('paymentModal');
    const modal = window.bootstrap.Modal.getInstance(modalElement);
    modal.hide(); // close the modal
  
    console.log('Razorpay object:', (window as any).Razorpay); // check Razorpay loaded
  
    this.paymentService.createOrder(this.fare).subscribe((order: any) => {
      const options = {
        key: 'rzp_test_UV4TK1BtVZllmL',
        amount: order.amount,
        currency: order.currency,
        name: 'EasyMove',
        description: 'Booking Payment',
        image: '', 
        order_id: order.id,
        handler: (response: any) => {
          this.onBook(response);
        },
        prefill: {
          name: sessionStorage.getItem('name'),
          email: sessionStorage.getItem('email'),
          contact: sessionStorage.getItem('phone'),
        },
        notes: {
          address: 'Karve Nagar, Pune',
        },
        theme: {
          color: '#5ba2cf',
        },
      };
  
      const rzp = new window['Razorpay'](options);
      rzp.open();
    });
  }
  

  onBook(paymentResponse: any) {
    console.log(paymentResponse);
    
    const fare = this.calculateFare(this.bookingForm.value.distance, this.bookingForm.value.weight);
    const booking = { ...this.bookingForm.value };
    delete booking.distance;
    booking.fare = fare;
    booking.customer_id = Number(sessionStorage.getItem('user_id'));

    this.bookingService.booking(booking).subscribe((response: any) => {
      if (response.success) {
        console.log('Booking saved', response);
        this.savePaymentDetails(response.booking_id, paymentResponse);
        console.log('save payment after');
        this.toast.success({ detail: "SUCCESS", summary: 'Booking Successfully', duration: 5000, position: 'topRight' });
        this.router.navigate(['customer-dashboard/booking-details']); 
        this.bookingForm.reset();
      } else {
        console.log('Booking failed', response);
        this.toast.error({ detail: "Error! please try again!", summary: 'Failed To Book', duration: 5000, position: 'topRight' });
      }
    });
  }

  savePaymentDetails(bookingId: number, paymentResponse: any) {
    const paymentData = {
      booking_id: bookingId,
      transaction_id: paymentResponse.razorpay_payment_id,
      amount: this.fare
    };
  
    this.paymentService.savePayment(paymentData).subscribe((res: any) => {
      console.log('Payment details saved:', res);
    });
  }

  calculateFare(distance: number, weight: number, extras = 0) {
    const baseFare = 100;
    const ratePerKM = 5;
    const ratePerHour = 200;
    const ratePerKG = 5; // adjust based on your pricing

    const time = this.calculateTime(distance);
    const fare =
      baseFare +
      distance * ratePerKM +
      time * ratePerHour +
      weight * ratePerKG +
      extras;

    return Math.round(fare); // rounded to nearest Rs.
  }

  calculateTime(distance: number, averageSpeedKmph: number = 45) {
    const timeInHours = distance / averageSpeedKmph;
    return Number(timeInHours.toFixed(2));
  }
}
