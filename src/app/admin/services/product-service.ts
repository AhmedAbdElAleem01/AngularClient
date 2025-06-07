import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/admin/products';

  constructor(private http:HttpClient) { }
  
  getAllProducts():Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getProductById(productId:number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${productId}`);
  }
  
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${productId}` , { responseType: 'text' });
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, formData , { responseType: 'text' });
  }

  updateProduct(productId: number, product: any): Observable<any> {
    console.log("product: " , product);
    return this.http.post(`${this.baseUrl}/update/${productId}`, product , {responseType: 'text'});
  }
}
