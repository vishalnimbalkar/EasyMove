import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  baseUrl:string='http://localhost:3000/auth/'

  //customer signup
  customerSignUp(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'signup/customer', payload);
  }
  
  //customer signup
  driverSignUp(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'signup/driver', payload);
  }
  
  //login customer/driver/admin
  login(payload:any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login',payload);
  }

  getUser(email:any){
    return this.http.get(this.baseUrl+"getUser/"+email)
  }
}
