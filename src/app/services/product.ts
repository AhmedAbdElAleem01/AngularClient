import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../models/product';
import {map, Observable} from 'rxjs';
import {Category} from '../models/category';
import {CategoryDTO} from '../models/categoryDTO';
import {ProductDTO} from '../models/productDTO';

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

  public getUserPreferences(id:number): Observable<CategoryDTO[]>{

    return this._http.get<CategoryDTO[]>(`http://localhost:8080/user-interests/${id}`);
  }

  public getClassicProducts(limit:number): Observable<ProductDTO[]>{
    return this._http.get<Product[]>(`http://localhost:8080/products/classic/${limit}`);
  }

  public getCategories(): Observable<CategoryDTO[]>{
    return this._http.get<Category[]>(`http://localhost:8080/categories`);
  }

}
