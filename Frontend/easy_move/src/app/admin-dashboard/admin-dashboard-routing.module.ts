import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:'',component:SidebarComponent,
    children: [
      { 
        path: '', redirectTo: 'profile', pathMatch: 'full' 
      },
      {
        path: 'profile', component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
