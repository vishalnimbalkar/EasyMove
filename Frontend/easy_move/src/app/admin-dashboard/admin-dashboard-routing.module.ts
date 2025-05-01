import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { DriverManagementComponent } from './driver-management/driver-management.component';
import { PaymentComponent } from './payment/payment.component';
import { VehicleManagementComponent } from './vehicle-management/vehicle-management.component';

const routes: Routes = [
  {
    path:'',component:SidebarComponent,
    children: [
      { 
        path: '', redirectTo: 'profile', pathMatch: 'full' 
      },
      {
        path: 'profile', component: ProfileComponent
      },
      {
        path: 'booking-details', component: BookingDetailsComponent
      },
      {
        path: 'customer-management', component: CustomerManagementComponent
      },
      {
        path: 'driver-management', component: DriverManagementComponent
      },
      {
        path: 'vehicle-management', component: VehicleManagementComponent
      },
      {
        path: 'payment', component: PaymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
