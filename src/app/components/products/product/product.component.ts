import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../../services/product';
import {Product} from '../../../models/product';
import {Category} from '../../../models/category';
import {ShopService} from '../../../services/shop.service';

import {ProductDTO} from '../../../models/productDTO';
import {PageProductDTO} from '../../../models/pageProductDTO';
import {CategoryDTO} from '../../../models/categoryDTO';
import { CartService } from '../../../services/Cart';
import { CartItemDetailsDTO } from '../../../models/cartItemDetailsDTO';
import {CartPublisher} from '../../../services/cart-publisher';
import {combineLatestAll, interval, Subscription, take} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

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
message:string="";
  private exist: boolean = false;
  constructor(private _shopService:ShopService, private _productService:ProductService,private cartService: CartService,
              private _cartPublisher:CartPublisher, private router:ActivatedRoute) {}

  ngOnInit(): void {
    // First load categories
    this._shopService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;

        // Now process query params AFTER categories are loaded
        this.router.queryParams.subscribe(params => {
          if(params['catName']) {
            this.filters.category = params['catName'];
            this.loadPage();
          } else {
            this.loadPage();
          }
        });
      },
      error: (error) => console.log(error)
    });

    // Keep the interval outside the category loading
    this.refreshSub = interval(25000).subscribe(() => this.loadPage());
  }

  ngOnDestroy() {
    this.refreshSub?.unsubscribe();
  }

  private refreshSub!: Subscription;

  cur!: Product;

  basePath = 'http://localhost:8080/images/';

  products: ProductDTO[] = [

  ];

  categories: CategoryDTO[] = [

  ]

  filters: Filter = {
    title: '',
    category: '',
    minPrice: 0,
    maxPrice: Infinity
  };

  loading:boolean=true;

  page = 0;
  size = 6;
  totalPages =  0;

  trackByProductId(_idx: number, item: ProductDTO) {
    return item.id;
  }


  loadPage() {
    this.loading = true;

    console.log("inside loadPage ");
    console.log(this.filters);

    const categoryId = this.filters.category
      ? this.categories.find(c => c.name === this.filters.category)?.id
      : undefined;

    const minPrice = this.filters.minPrice > 0 ? this.filters.minPrice : undefined;
    const maxPrice = this.filters.maxPrice !== Infinity ? this.filters.maxPrice : undefined;

    this._shopService.filterProducts(categoryId, minPrice, maxPrice, this.page, this.size).subscribe({
      next: (pageData: PageProductDTO) => {
        this.products = pageData.content ? pageData.content.map(p => ({
          ...p,
            imageUrl: `${this.basePath}${p.imageUrl}`
        })) : [];
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

  addToCart(id:number ): void {
      let quantity= 1;
      this._productService.getProductById(+id).subscribe({
        next: (product) => {
          this.cur = {...product, imageUrl: `${this.basePath}${product.imageUrl}`};
          let x= this.products.find(a=> a.id == id);
          if (x) {
            Object.assign(x, this.cur);
          }
          if (this.cur&&this.cur.stockQuantity <= 0) {
              this.message = 'Product is out of stock';
              return;
          }
          this.cartService.getCartItems().pipe(take(1)).subscribe(items => {
            this.exist = items.some(item => item.productId === product?.id);
          });
          this.cartService.addToCart(id, quantity).subscribe({
            next: (cartItemDetails: CartItemDetailsDTO) => {
            this.message = 'Product added to cart successfully!';
            if(!this.exist) this._cartPublisher.incrementCart();
            console.log('Product added to cart:', cartItemDetails);
          },
            error: (error: Error) => { // Use proper Error type
            this.message = error.message;
            console.error('Error adding to cart:', error);
        }
      });

          setTimeout(() => {
            this.message = '';
          }, 3000);
      },
          error: (error) => {
          console.error(error);
        }
    });

  }

  onSizeChange(newSize: number) {
    this.size = newSize;
    this.page = 0;
    this.loadPage();
  }

  readonly INF = Infinity;


  protected readonly console = console;
}
