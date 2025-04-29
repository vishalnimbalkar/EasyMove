import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router) {}

  canActivate(route: any): boolean {
    const userData = this.getUser(); // Assume it returns { role: 'admin' | 'user' | 'driver' }
    console.log(userData);
    
    const expectedRole = route.data['expectedRole'];
    if (userData && userData.role === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  getUser(){
    return JSON.parse(sessionStorage.getItem('user') || "{}");
  }
}
