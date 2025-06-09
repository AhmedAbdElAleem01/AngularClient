import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:8080/profile';

  constructor(private http:HttpClient) { }

  getUserProfile(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getShippingAddress(userId: number) {
    return this.http.get<any>(`${this.baseUrl}/${userId}/address`);
  }
  updateUserAccountDetails(id: number, body: any = null): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/accountDetails`, body , { responseType: 'text' });
  }
  updateAddress(id:number , body:any=null):Observable<any>{
    return this.http.post(`${this.baseUrl}/${id}/address` , body , { responseType: 'text'});
  }
  changePassword(id:number , body:any=null):Observable<any>{
    return this.http.post(`${this.baseUrl}/${id}/password` ,body , {responseType: 'text'});
  }
}
