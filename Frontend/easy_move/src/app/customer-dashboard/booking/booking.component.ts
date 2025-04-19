import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  // Fare = Base Fare + (Distance × Rate per KM) + (Time × Rate per Hour) + Extra Charges (if any)
  bookingForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {

    this.bookingForm = this.fb.group({
      pickup_location: ['', Validators.required],
      dropoff_location: ['', Validators.required],
      pickup_date: ['', Validators.required],
      weight: ['', Validators.required],
      distance: ['', Validators.required],
    });
  }
  onBook() {
    const fare = this.calculateFare(this.bookingForm.value.distance);
    const booking = { ...this.bookingForm.value };
    delete booking.distance;
    booking.fare = fare;
    booking.customer_id = Number(sessionStorage.getItem('user_id'))
    this.bookingService.booking(booking).subscribe((response: any) => {
      if (response.success) {
        console.log(response);
        this.bookingForm.reset();
      } else {
        console.log(response);
      }
    });
    console.log(booking);
  }
  calculateFare(distance: number, extras = 0) {
    const baseFare = 100;
    const ratePerKM = 15;
    const ratePerHour = 500;
    const time = this.calculateTime(distance);
    const fare = baseFare + distance * ratePerKM + time * ratePerHour + extras;
    return fare;
  }

  calculateTime(distance: number, averageSpeedKmph: number = 45) {
    const timeInHours = distance / averageSpeedKmph;
    return Number(timeInHours.toFixed(2));
  }
}
