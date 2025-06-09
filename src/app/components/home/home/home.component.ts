import { Component } from '@angular/core';
import {Routes} from '@angular/router';
import {ProductDTO} from '../../../models/productDTO';
import {CategoryDTO} from '../../../models/categoryDTO';





@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  baseUrl:string = 'http://localhost:8080/images/';

  classicProducts: ProductDTO[] = [
    {
      id: 1,
      name: 'Chocolate Cake',
      categoryId: 10,
      categoryName: 'Desserts',
      description: 'Delicious dark chocolate cake',
      price: 15.99,
      imageUrl: this.baseUrl+'cup1.jpg',
      stockQuantity: 20,
      ingredients: 'Flour, sugar, cocoa, eggs, butter'
    },
    {
      id: 2,
      name: 'Vanilla Coffee',
      categoryId: 5,
      categoryName: 'Beverages',
      description: 'Smooth vanilla flavored coffee',
      price: 4.50,
      imageUrl: this.baseUrl+'cup4.jpg',
      stockQuantity: 50,
      ingredients: 'Coffee, milk, vanilla syrup'
    },
    {
      id: 3,
      name: 'Blueberry Muffin',
      categoryId: 10,
      categoryName: 'Desserts',
      description: 'Fresh blueberry muffins',
      price: 3.99,
      imageUrl:this.baseUrl+ 'cup3.jpg',
      stockQuantity: 35,
      ingredients: 'Flour, blueberries, sugar, eggs, butter'
    },
    {
      id: 3,
      name: 'Blueberry Muffin',
      categoryId: 10,
      categoryName: 'Desserts',
      description: 'Fresh blueberry muffins',
      price: 3.99,
      imageUrl: this.baseUrl+'cup3.jpg',
      stockQuantity: 35,
      ingredients: 'Flour, blueberries, sugar, eggs, butter'
    },
    {
      id: 3,
      name: 'Blueberry Muffin',
      categoryId: 10,
      categoryName: 'Desserts',
      description: 'Fresh blueberry muffins',
      price: 3.99,
      imageUrl: this.baseUrl+'cup3.jpg',
      stockQuantity: 35,
      ingredients: 'Flour, blueberries, sugar, eggs, butter'
    }
  ];

  prefs:CategoryDTO[] = [
    {
      id: 1,
      name: 'Chocolate Cake',
      description: '',
      imageUrl: this.baseUrl+'cup1.jpg'
    },
    {
      id: 1,
      name: 'Chocolate Cake',
      description: '',
      imageUrl: this.baseUrl+'cup5.jpg'
    }
  ]

}
