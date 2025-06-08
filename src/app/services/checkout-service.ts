import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItemDetailsDTO } from '../models/cartItemDetailsDTO';
import { UserDTO } from '../models/userDTO';
import { BillingDetailsDTO, CheckoutResponseDTO } from '../models/billingDetailsDTO';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getCartItems(userId: number): Observable<CartItemDetailsDTO[]> {
    return this.http.get<CartItemDetailsDTO[]>(`${this.apiUrl}/cart/user/${userId}`);
  }

  getTotalCost(userId: number): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/checkout/user/${userId}/cost`, {});
  }

  getUserDetails(userId: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/users/${userId}`);
  }

  processCheckout(userId: number, billingDetails: BillingDetailsDTO): Observable<CheckoutResponseDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<CheckoutResponseDTO>(
      `${this.apiUrl}/checkout/user/${userId}/cart`, 
      billingDetails,
      { headers }
    );
  }
}