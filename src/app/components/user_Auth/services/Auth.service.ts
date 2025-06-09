import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

// Interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserDTO {
  id: number;
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  password?: string;
  creditLimit: number;
  birthDate: Date;
  job: string;
  createdAt: Date;
  authorities: string[];
}

export interface LoginResponse {
  token: string;
  user: UserDTO;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/users';
  private currentUserSubject = new BehaviorSubject<UserDTO | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    // Check if user data exists in localStorage on service initialization
    this.loadUserFromStorage();
    this.loggedIn.next(!!this.currentUser$); // set initial state
  }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap(response => {
          this.setUserData(response.user, response.token);
          this.loggedIn.next(true);
        })
      );
  }

  setUserData(user: UserDTO, token: string): void {
    // Store in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authToken', token);
    
    // Update BehaviorSubject
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): UserDTO | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    // Clear localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    
    // Update BehaviorSubject
    this.currentUserSubject.next(null);
    this.loggedIn.next(false);
  }

  private loadUserFromStorage(): void {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        this.logout(); // Clear invalid data
      }
    }
  }

  // Helper method to check if user has specific authority
  hasAuthority(authority: string): boolean {
    const user = this.getCurrentUser();
    return user?.authorities?.includes(authority) || false;
  }


  isLoggedIn(): boolean {
    const token = this.getToken();
    const isValid = !!token && token.trim() !== '';
    console.log('Checking if logged in:', isValid, 'Token:', token);
    return isValid;
  }
    // Get authentication data
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserData(): any | null {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }
// In your AuthService
isAdmin(): boolean {
    const userData = this.getUserData();
    if (!userData) return false;
    
    // Check if authorities array exists and contains 'admin'
    const isAdmin = userData.authorities && 
                   userData.authorities.includes('ROLE_ADMIN');
    
    console.log('Admin check:', isAdmin, 'User authorities:', userData.authorities);
    return isAdmin;
}
}