import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetailsDTO } from '../../../models/cartItemDetailsDTO';
import { CartService } from '../../../services/Cart';
import {CartPublisher} from '../../../services/cart-publisher';



@Component({
  selector: 'app-cart-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  cartItems: CartItemDetailsDTO[] = [];
  loading = true;
  error = '';
  updating: { [key: number]: boolean } = {};
  checkingOut = false;
  errorMessage: string | null = null;

  constructor(
    private cartService: CartService,
    private router: Router,
    private _cartPublisher: CartPublisher
  ) {}

  ngOnInit(): void {
    this.errorMessage = history.state?.errorMessage || null;
    if (this.errorMessage) {
      setTimeout(() => {
        this.errorMessage = null;
      }, 6000);
    }
    this.loadCartItems();

  }

  get isAuthenticated(): boolean {
    return this.cartService.isAuthenticated();
  }

  get totalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.totalPricePerProduct || 0);
    }, 0);
  }

  get hasStockIssues(): boolean {
    return this.cartItems.some(item => (item.quantity || 0) > (item.available_quantity || 0));
  }

  get isCheckoutDisabled(): boolean {
    return this.checkingOut ||
           this.cartItems.length === 0 ||
           this.hasStockIssues ||
           Object.keys(this.updating).some(key => this.updating[+key]);
  }

  getStockStatusMessage(item: CartItemDetailsDTO): string {
    if ((item.quantity || 0) > (item.available_quantity || 0)) {
      return `Only ${item.available_quantity} left in stock`;
    }
    return '';
  }

  isQuantityValid(item: CartItemDetailsDTO): boolean {
    return (item.quantity || 0) <= (item.available_quantity || 0);
  }

  trackByItemId(index: number, item: CartItemDetailsDTO): number {
    return item.productId || index;
  }

  loadCartItems(): void {
    if (!this.isAuthenticated) {
      this.error = 'Please login to view your cart';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.cartService.getCartItems().subscribe({
      next: (response: any) => {
        this.cartItems = response.items || response || [];
        this.error = '';
        this.loading = false;
      },
      error: (err) => {
        if (err.status === 401) {
          this.error = 'Your session has expired. Please login again.';
        } else {
          this.error = 'Failed to load cart items. Please try again.';
        }
        this.loading = false;
      }
    });
  }

  updateQuantity(itemId: number, newQuantity: number): void {
    if (newQuantity < 1) return;

    const item = this.cartItems.find(i => i.productId === itemId);
    if (!item) return;

    

    if (!this.isAuthenticated) {
      this.error = 'Please login to update cart';
      return;
    }

    this.updating[itemId] = true;
    this.cartService.updateItemQuantity(itemId, newQuantity).subscribe({
      next: (updatedItem) => {
        if (item) {
          item.available_quantity=updatedItem.available_quantity;
          if (newQuantity > (item.available_quantity || 0)&&newQuantity>=item.quantity!) {
            this.error = `Cannot add more than ${item.available_quantity} items. Only ${item.available_quantity} left in stock.`;
            this.updating[itemId] = false;
            return;
          }
          item.quantity = newQuantity;
          item.totalPricePerProduct = (item.unit_price || 0) * newQuantity;
        }
        this.updating[itemId] = false;
        this.clearError();
      },
      error: (err) => {
        if (err.status === 401) {
          this.error = 'Your session has expired. Please login again.';
        } else {
          this.error = 'Failed to update quantity. Please try again.';
          alert(err.status)
        }
        this.updating[itemId] = false;
      }
    });
  }

  removeItem(itemId: number): void {
    if (!this.isAuthenticated) {
      this.error = 'Please login to remove items';
      return;
    }

    this.updating[itemId] = true;
    this.cartService.removeItem(itemId).subscribe({
      next: (response:any) => {
        this.cartItems = this.cartItems.filter(item => item.productId !== itemId);
        this.updating[itemId] = false;
        this._cartPublisher.decrementCart()

      },
      error: (err) => {
        if (err.status === 401) {
          this.error = 'Your session has expired. Please login again.';
        } else {
          this.error = 'Failed to remove item. Please try again.';
          alert(err.status);
        }
        this.updating[itemId] = false;
      }
    });
  }

  checkout(): void {
  if (!this.isAuthenticated) {
    this.error = 'Please login to checkout';
    return;
  }

  if (this.cartItems.length === 0) {
    this.error = 'Your cart is empty';
    return;
  }

  this.checkingOut = true;

  this.cartService.getCartItems().subscribe({
    next: (response:any) => {
      this.cartItems = response.items || response || [];

      if (this.hasStockIssues) {
        this.error = 'Some items exceed stock. Adjust quantities.';
        this.checkingOut = false;
        return;
      }

      this.router.navigateByUrl('/checkout');
    },
    error: (err) => {
      this.error = 'Error refreshing cart. Try again.';
      this.checkingOut = false;
    }
  });
}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  clearError(): void {
    this.error = '';
  }
}
