import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http:HttpClient) { }

  baseUrl:string='http://localhost:3000/vehicle/'

   //customer signup
    addVehicle(payload: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + 'add', payload);
    }

    getAllVehicles(): Observable<any> {
      return this.http.get<any>(this.baseUrl + 'getAll');
    }

    getVehiclesById(driver_id:number): Observable<any> {
      return this.http.get<any>(this.baseUrl + 'getById/'+driver_id);
    }

    updateVehicle(payload: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + 'update', payload);
    }

    deleteVehicle(vehicle_id:number): Observable<any> {
      return this.http.delete<any>(this.baseUrl + 'delete/'+vehicle_id);
    }
}
