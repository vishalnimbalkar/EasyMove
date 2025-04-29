import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path:'home', component:HomeComponent
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'customer-signup', component:CustomerSignupComponent
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),
    canActivate:[AuthGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'customer-dashboard',
    loadChildren: () => import('./customer-dashboard/customer-dashboard.module').then(m => m.CustomerDashboardModule),
    canActivate:[AuthGuard],
    data: { expectedRole: 'customer' }
  },
  {
    path: 'driver-dashboard',
    loadChildren: () => import('./driver-dashboard/driver-dashboard.module').then(m => m.DriverDashboardModule),
    canActivate:[AuthGuard],
    data: { expectedRole: 'driver' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
