import { Component } from '@angular/core';
import {CartItem, CartService} from '../cart-service';

@Component({
  selector: 'cart-layout',
  standalone: false,
  templateUrl: './cart-layout.component.html',
})
export class CartLayoutComponent {

  cartItems: CartItem[] = [];

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this._cartService.getCartItems();
  }

  onRemove(itemId: number) {
    this._cartService.removeItem(itemId);
    this.cartItems = this._cartService.getCartItems();
  }

}
