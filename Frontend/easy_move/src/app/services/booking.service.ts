import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }
  baseUrl:string='http://localhost:3000/booking/'

  booking(payload: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + 'request', payload);
    }

    getBookingDetails(customer_id: number): Observable<any> {
      return this.http.get<any>(this.baseUrl + 'getDetails/'+customer_id);
      
    }

    cancelBooking(booking_id:number): Observable<any> {
      return this.http.delete<any>(this.baseUrl + 'cancelBooking/'+booking_id);
    }

    getAllBookingDetails(): Observable<any> {
      return this.http.get<any>(this.baseUrl + 'getAllDetails');
    }
}
