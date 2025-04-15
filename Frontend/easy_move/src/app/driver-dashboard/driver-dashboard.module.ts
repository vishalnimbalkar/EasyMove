import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrivereDashboardRoutingModule } from './driver-dashboard-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    DrivereDashboardRoutingModule
  ]
})
export class DriverDashboardModule { }
