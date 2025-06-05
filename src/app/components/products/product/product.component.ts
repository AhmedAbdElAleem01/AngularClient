import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../../services/product';
import {Product} from '../../../models/product';
import {Category} from '../../../models/category';
import {ShopService} from '../../../services/shop.service';
import {CartService} from '../../../services/cart.service';

interface Filter {
  title: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

@Component({
  selector: 'products-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone:false
})
export class ProductComponent implements OnInit{

  constructor(private _productService:ProductService,private _shopService:ShopService, private _cart:CartService) {}

  ngOnInit(): void {

    this._cart.getCartProducts(9).subscribe({
      next: value => console.log(value)
    })

    this._shopService.filterProducts(1, 0, 100).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.error(err)
    });



    this._productService.getProducts().subscribe(products => {this.products = products; this.loading = false})
    this._productService.getCategories().subscribe(categories => this.categories = categories)
    this._productService.getBanner().subscribe(banner => this.banner = banner)
  }

  products: Product[] = [

  ];

  categories: Category[] = [

  ]

  banner: string="";

  loading:boolean=true;

  filters: Filter = {
    title: '',
    category: '',
    minPrice: 0,
    maxPrice: Infinity
  };

  applyFilters(
    titleValue: string,
    categoryValue: string,
    minPriceValue: string,
    maxPriceValue: string
  ) {
    this.filters.title = titleValue.trim();
    this.filters.category = categoryValue.trim();
    this.filters.minPrice = minPriceValue ? +minPriceValue : 0;
    this.filters.maxPrice = maxPriceValue ? +maxPriceValue : Infinity;
  }

  resetFilters(
    titleInput: HTMLInputElement,
    categoryInput: HTMLSelectElement,
    minPriceInput: HTMLInputElement,
    maxPriceInput: HTMLInputElement
  ) {
    titleInput.value = '';
    categoryInput.value = '';
    minPriceInput.value = '';
    maxPriceInput.value = '';

    this.filters = {
      title: '',
      category: '',
      minPrice: 0,
      maxPrice: Infinity
    };
  }

  readonly INF = Infinity;


}
