import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  checkEmail(email: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/check-email?email=${email}`, { 
      responseType: 'text' 
    });
  }

  checkUsername(username: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/check-username?username=${username}`, { 
      responseType: 'text' 
    });
  }

  // Fixed registerUser method with proper headers
  registerUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('Making API call to:', `${this.apiUrl}/register`);
    console.log('With data:', userData);

    // Tell Angular to expect text response, not JSON
    return this.http.post(`${this.apiUrl}/register`, userData, { 
      headers,
      responseType: 'text' 
    });
  }
}