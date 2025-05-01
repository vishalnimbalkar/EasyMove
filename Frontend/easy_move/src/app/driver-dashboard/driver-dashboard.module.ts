import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrivereDashboardRoutingModule } from './driver-dashboard-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PaymentComponent } from './payment/payment.component';
import { VehicleComponent } from './vehicle/vehicle.component';

@NgModule({
  declarations: [SidebarComponent, ProfileComponent, BookingDetailsComponent, PaymentComponent, VehicleComponent],
  imports: [
    CommonModule,
    DrivereDashboardRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DriverDashboardModule {}
