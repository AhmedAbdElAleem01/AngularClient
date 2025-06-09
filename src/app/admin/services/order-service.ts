import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/admin/orders'; 

  constructor(private http:HttpClient) { }

  getAllOrders() {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getOrderDetailsById(orderId: number) {
    return this.http.get<any>(`${this.baseUrl}/orderDetails/${orderId}`);
  }

  getOrderById(orderId:number){
    return this.http.get<any>(`${this.baseUrl}/${orderId}`);
  }
}
