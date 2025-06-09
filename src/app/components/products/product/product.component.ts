import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../../services/product';
import {Product} from '../../../models/product';
import {Category} from '../../../models/category';
import {ShopService} from '../../../services/shop.service';
import {CartService} from '../../../services/cart.service';
import {ProductDTO} from '../../../models/productDTO';
import {PageProductDTO} from '../../../models/pageProductDTO';
import {CategoryDTO} from '../../../models/categoryDTO';

interface Filter {
  title: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

@Component({
  selector: 'products-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone:false
})
export class ProductComponent implements OnInit{

  constructor(private _shopService:ShopService) {}

  ngOnInit(): void {
    this.loadPage()
    // this._shopService.getAllProducts().subscribe({
    //   next: (response) => {this.products = response; this.loading = false;console.log(response)},
    //   error: (error) => console.log(error)
    // });

    this._shopService.getAllCategories().subscribe({
      next: (response) => this.categories = response,
      error: (error) => console.log(error)
    });

    //this._productService.getProducts().subscribe(products => {this.products = products; this.loading = false})
    //this._productService.getCategories().subscribe(categories => this.categories = categories)
    //this._productService.getBanner().subscribe(banner => this.banner = banner)
  }

  products: ProductDTO[] = [

  ];

  categories: CategoryDTO[] = [

  ]

  banner: string="";

  loading:boolean=true;

  page = 0;
  size = 6;
  totalPages =  0;



  filters: Filter = {
    title: '',
    category: '',
    minPrice: 0,
    maxPrice: Infinity
  };

  loadPage() {
    this.loading = true;

    const categoryId = this.filters.category
      ? this.categories.find(c => c.name === this.filters.category)?.id
      : undefined;

    const minPrice = this.filters.minPrice > 0 ? this.filters.minPrice : undefined;
    const maxPrice = this.filters.maxPrice !== Infinity ? this.filters.maxPrice : undefined;

    console.log(categoryId, minPrice, maxPrice);
    this._shopService.filterProducts(categoryId, minPrice, maxPrice, this.page, this.size).subscribe({
      next: (pageData: PageProductDTO) => {
        this.products = pageData.content ? pageData.content : [];
        this.totalPages = pageData.totalPages ? pageData.totalPages : 0;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }


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

    this.page = 0;
    console.log(this.filters);
    this.loadPage();
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

  onNext() {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.loadPage();
    }
  }

  onPrev() {
    if (this.page > 0) {
      this.page--;
      this.loadPage();
    }
  }

  onSizeChange(newSize: number) {
    this.size = newSize;
    this.page = 0;
    this.loadPage();
  }

  readonly INF = Infinity;


  protected readonly console = console;
}
