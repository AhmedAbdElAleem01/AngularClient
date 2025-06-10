import {Component, OnInit} from '@angular/core';
import {Routes} from '@angular/router';
import {ProductDTO} from '../../../models/productDTO';
import {CategoryDTO} from '../../../models/categoryDTO';
import {AuthService, UserDTO} from '../../user_Auth/services/Auth.service';
import {ProductService} from '../../../services/product';





@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  baseUrl:string = 'http://localhost:8080/images/';

  user:UserDTO|null = null;

  constructor(private _authService:AuthService, private _productService:ProductService) {}

  ngOnInit() {
    this._authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user?.id) {
        this.loadUserPreferences(user.id);
      }
    });

    this._productService.getClassicProducts(5).subscribe({
      next: (products) => {
        this.classicProducts = products.map(product => ({
          ...product,
          imageUrl: this.baseUrl + product.imageUrl
        }));
      },
      error: (err) => {
        console.error('Failed to load classic products:', err);
      }
    })


    this._productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories.map(category => ({
          ...category,
          imageUrl: this.baseUrl + category.imageUrl
        }));
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      }
    })
  }


  private loadUserPreferences(userId: number): void {
    this._productService.getUserPreferences(userId).subscribe({
      next: (preferences) => {
        this.prefs = preferences.map(pref => ({
          ...pref,
         imageUrl: this.baseUrl + pref.imageUrl
        }));
      },
      error: (err) => {
        console.error('Failed to load preferences:', err);
        this.prefs = [
          {
            id: 1,
            name: 'Chocolate Cake',
            description: '',
            imageUrl: this.baseUrl + 'cup1.jpg'
          }
        ];
      }
    });
  }

  classicProducts: ProductDTO[] = [

  ];

  prefs:CategoryDTO[] = [

  ]

  categories:CategoryDTO[] = [

  ];

}
