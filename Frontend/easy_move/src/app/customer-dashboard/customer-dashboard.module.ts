import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomerDashboardRoutingModule } from './customer-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [
    SidebarComponent,
    ProfileComponent,
    BookingComponent,
    BookingDetailsComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    CustomerDashboardRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class CustomerDashboardModule { }
