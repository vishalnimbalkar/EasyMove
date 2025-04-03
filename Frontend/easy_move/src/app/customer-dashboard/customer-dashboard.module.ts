import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    SidebarComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CustomerDashboardModule { }
