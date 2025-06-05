import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';
import {map, Observable} from 'rxjs';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient) { }


  public getProducts(): Observable<Product[]> {
   return this._http
      .get<{ products: any[]}>('https://dummyjson.com/products')
      .pipe(
        map(response => response.products.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          category: item.category,
          stock: item.stock,
          imageUrl: item.thumbnail,
          rating:item.rating,
          desc:item.description
        })))
      );
  }

  public getCategories(): Observable<Category[]>{
    return this._http
      .get<any[]>('http://dummyjson.com/products/categories')
      .pipe(
        map(response => response.map(cat => ({
          name: cat.name
        })))
      )
  }

  public getBanner(): Observable<string> {
    return this._http.get<{ products: any[] }>('https://dummyjson.com/products?limit=1')
      .pipe(
        map(response => response.products[0].thumbnail)
      );
  }

  public getProductById(id: number): Observable<Product> {
    return this._http
      .get<any>(`https://dummyjson.com/products/${id}`)
      .pipe(
        map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          category: item.category,
          stock: item.stock,
          imageUrl: item.thumbnail,
          rating: item.rating,
          desc:item.description
        }))
      );
  }


}
