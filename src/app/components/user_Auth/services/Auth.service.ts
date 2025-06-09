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

  constructor(private http: HttpClient) {
    // Check if user data exists in localStorage on service initialization
    this.loadUserFromStorage();
  }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap(response => {
          this.setUserData(response.user, response.token);
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

//   getToken(): string | null {
//     return localStorage.getItem('authToken');
//   }

//   isLoggedIn(): boolean {
//     const token = this.getToken();
//     const user = this.getCurrentUser();
//     return !!(token && user);
//   }

  logout(): void {
    // Clear localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    
    // Update BehaviorSubject
    this.currentUserSubject.next(null);
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

  // Check admin status
//   isAdmin(): boolean {
//     const userData = this.getUserData();
//     const isAdmin = userData && (
//       userData.role === 'admin' || 
//       userData.role === 'ADMIN' ||
//       userData.isAdmin === true ||
//       userData.admin === true
//     );
//     console.log('Checking admin status:', isAdmin, 'User data:', userData);
//     return isAdmin;
//   }
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