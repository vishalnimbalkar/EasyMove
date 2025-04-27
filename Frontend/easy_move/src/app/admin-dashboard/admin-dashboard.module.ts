import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PaymentComponent } from './payment/payment.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { DriverManagementComponent } from './driver-management/driver-management.component';



@NgModule({
  declarations: [
    SidebarComponent,
    ProfileComponent,
    BookingDetailsComponent,
    PaymentComponent,
    CustomerManagementComponent,
    DriverManagementComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule
  ]
})
export class AdminDashboardModule { }
