import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:3000/customer/';

  getAllCustomers(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getAll');
  }
}
