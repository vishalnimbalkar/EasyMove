import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from '../driver-dashboard/profile/profile.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'booking-details',
        component: BookingDetailsComponent,
      },
      {
        path: 'vehicle',
        component: VehicleComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrivereDashboardRoutingModule {}
