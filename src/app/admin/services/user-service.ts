import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/userDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/admin/customers';

  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.baseUrl}`);
  }

  getOrderByCustomerId(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${customerId}/orders`);
  }

}
