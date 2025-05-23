import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:3000/payment/';

  getAllPayments(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getAll');
  }

  getPaymentDetails(customer_id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getCustomerDetails/' + customer_id);
  }

  getDriverPaymentDetails(driver_id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getDriverDetails/' + driver_id);
  }

  createOrder(amount: number) {
    return this.http.post<any>(this.baseUrl + 'create-order', {
      amount: amount,
      currency: 'INR',
    });
  }

  savePayment(payload:any): Observable<any>{
    return this.http.post<any>(this.baseUrl + 'insertPaymentDetails',payload);
  }
}
