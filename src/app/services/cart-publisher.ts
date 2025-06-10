import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './Cart';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartPublisher {
  private cartCountSource = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSource.asObservable();

  constructor(private _cartService: CartService) {
    this.initializeCartCount();
  }

  private initializeCartCount() {
    this._cartService.getCartItems().subscribe({
      next: cartItems => {
        this.cartCountSource.next(cartItems.length);
        console.log("length:" + cartItems.length);
      },
      error: () => this.cartCountSource.next(0)
    });
  }

  updateCartCount(count: number) {
    this.cartCountSource.next(count);
  }

  // Optional helper methods if needed:
  incrementCart() {
    this.cartCountSource.next(this.cartCountSource.value + 1);
  }

  decrementCart() {
    if (this.cartCountSource.value > 0) {
      this.cartCountSource.next(this.cartCountSource.value - 1);
    }
  }
}
