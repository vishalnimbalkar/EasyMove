import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path:'',component:SidebarComponent,
    children: [
      { 
        path: '', redirectTo: 'profile', pathMatch: 'full' 
      },
      {
        path:"profile",component:ProfileComponent
      },
      {
        path:"booking",component:BookingComponent
      },
      {
        path:"booking-details",component:BookingDetailsComponent
      },
      {
        path:"payment",component:PaymentComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDashboardRoutingModule{}
