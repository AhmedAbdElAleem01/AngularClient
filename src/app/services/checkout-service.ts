import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl = 'http://localhost:8080/checkout/user';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getOrderSummary(userId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${userId}/summary`,
      { headers: this.getAuthHeaders() }
    );
  }

  getBillingDetails(userId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${userId}/info`,
      { headers: this.getAuthHeaders() }
    );
  }

  placeOrder(userId: number, billingDetails: any): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.post(`${this.baseUrl}/${userId}`, billingDetails, {
      headers,
      responseType: 'text'
    });
  }
}