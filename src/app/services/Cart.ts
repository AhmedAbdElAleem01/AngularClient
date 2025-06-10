import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartItemDetailsDTO } from '../models/cartItemDetailsDTO';
import { CartDTO } from '../models/cartDTO';
import { ProductService } from './product';

export interface AddToCartResponse {
  success: boolean;
  message: string;
  data?: CartItemDetailsDTO;
}

export interface CheckoutResponse {
  success: boolean;
  orderId: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/cart';

  constructor(private http: HttpClient ,private productService:ProductService) {
    // Set test token (remove this in production)
    //localStorage.setItem('token', "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMSIsImVtYWlsIjoic2FyYS5hbGlAZXhhbXBsZS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNzQ5NDEyMDMxLCJleHAiOjE3NDk0OTg0MzF9.VsWnKhi1MVhusGBt__cUH2Xb9yt4wM-L__JmZNE_Pe0");
  }

  addToCart(productId: number, quantity: number): Observable<CartItemDetailsDTO> {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return throwError(() => new Error('Please log in first to add items to your cart'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const cartData: CartDTO = {
      productId: productId,
      quantity: quantity
    };

    return this.http.post<CartItemDetailsDTO>(this.apiUrl, cartData, { headers })
      .pipe(
        catchError(error => {
          let errorMessage = 'Failed to add product to cart';
          
          if (error.status === 401) {
            errorMessage = 'Session expired. Please log in again';
          } else if (error.status === 400) {
            errorMessage = error.error?.message || 'Invalid request';
          } else if (error.status === 500) {
            errorMessage = 'Server error. Please try again later';
          }

          return throwError(() => new Error(errorMessage));
        })
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getCartItems(): Observable<CartItemDetailsDTO[]> {
    return this.http.get<CartItemDetailsDTO[]>(this.apiUrl, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateItemQuantity(itemId: number, quantity: number): Observable<CartItemDetailsDTO> {
    const cartData: CartDTO = {
      productId: itemId,
      quantity: quantity
    };
    return this.http.put<CartItemDetailsDTO>(`${this.apiUrl}`, 
      cartData, 
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  removeItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${itemId}`, { 
      headers: this.getAuthHeaders() 
      ,responseType: 'text' 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // checkout(items: CartItemDetailsDTO[]): Observable<CheckoutResponse> {
    
  //   return this.http.post<CheckoutResponse>(`${this.apiUrl}/checkout`, { 
  //     headers: this.getAuthHeaders() 
  //   }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(error: any): Observable<never> {
    console.error('Cart service error:', error);
    return throwError(() => error);
  }
}