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
  fare: number = 0;
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
  
    this.bookingForm.valueChanges.subscribe(val => {
      const distance = Number(val.distance || 0);
      const weight = Number(val.weight || 0);
      this.fare = this.calculateFare(distance, weight);
    });
  }
  onBook() {
    const fare = this.calculateFare(this.bookingForm.value.distance, this.bookingForm.value.weight);
    const booking = { ...this.bookingForm.value };
    delete booking.distance;
    booking.fare = fare;
    booking.customer_id = Number(sessionStorage.getItem('user_id'));
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
