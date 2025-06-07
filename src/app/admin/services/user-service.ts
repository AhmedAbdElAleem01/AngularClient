import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/admin/customers';

  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getOrderByCustomerId(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${customerId}/orders`);
  }

}
