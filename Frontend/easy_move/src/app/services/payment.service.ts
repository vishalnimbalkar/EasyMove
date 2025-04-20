import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  constructor(private http:HttpClient) { }

  baseUrl:string='http://localhost:3000/payment/'

    getPaymentDetails(customer_id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl + 'getDetails/'+customer_id);
      }
}
