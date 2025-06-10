import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product';
import { Product } from '../../../models/product';
import { CartService } from '../../../services/Cart';
import { CartItemDetailsDTO } from '../../../models/cartItemDetailsDTO';


@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1;
  message: string = '';
  loading: boolean = true;
  id: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")!;
      this.loadProduct(this.id);
    });
  }

  loadProduct(id: string): void {
    this.productService.getProductById(+id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
        console.log(this.product?.imageUrl);
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stockQuantity) {
      this.quantity++;
      this.message = '';
    } else {
      this.message = 'Cannot exceed available stock';
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.message = '';
    }
  }

  getStockStatus(): { text: string; class: string } {
    if (!this.product) return { text: '', class: '' };
    
    if (this.product.stockQuantity <= 0) {
      return { text: 'Out of Stock', class: 'out-of-stock' };
    } else if (this.product.stockQuantity < 10) {
      return { 
        text: `Only ${this.product.stockQuantity} left in stock`, 
        class: 'low-stock' 
      };
    } else {
      return { text: 'In Stock', class: 'in-stock' };
    }
  }

  getTotalPrice(): number {
    if (!this.product) return 0;
    
    const basePrice = this.product.price * this.quantity;
    return basePrice;
  }

  addToCart(): void {
    // Remove the loadProduct call - we already have the product loaded
    if (!this.product) return;
    this.productService.getProductById(+this.product.id).subscribe({
      next: (product) => {
        this.product = product;
        if (this.product.stockQuantity <= 0) {
      this.message = 'Product is out of stock';
      return;
    }

    if (this.quantity > this.product.stockQuantity) {
      this.message = 'Quantity exceeds available stock';
      return;
    }

    // Use the cart service to add to cart
    this.cartService.addToCart(this.product.id, this.quantity).subscribe({
      next: (cartItemDetails: CartItemDetailsDTO) => { // Use proper typing
        this.message = 'Product added to cart successfully!';
        console.log('Product added to cart:', cartItemDetails);
        
        // You can now access all cart item details:
        // cartItemDetails.id, cartItemDetails.totalPrice, etc.
        
        // Optionally reset quantity or redirect
        // this.quantity = 1;
      },
      error: (error: Error) => { // Use proper Error type
        this.message = error.message;
        console.error('Error adding to cart:', error);
      }
    });
    setTimeout(() => {
      this.message = '';
    }, 3000);
        console.log(this.product?.imageUrl);
      },
      error: (error) => {
        console.error(error);
        
      }
    });
    
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}