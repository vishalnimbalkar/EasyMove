import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrivereDashboardRoutingModule } from './driver-dashboard-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    SidebarComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    DrivereDashboardRoutingModule
  ]
})
export class DriverDashboardModule { }
