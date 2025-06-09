import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../models/product';
import {map, Observable} from 'rxjs';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient) { }


 public getProductById(id: number): Observable<Product> {
  const headers = new HttpHeaders({
    'Accept': 'application/json'
    // 'Authorization': 'Bearer <token>' // if needed
  });

  return this._http.get<Product>(`http://localhost:8080/products/${id}`, { headers });
}


}
