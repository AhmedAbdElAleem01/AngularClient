import { Injectable } from '@angular/core';


export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: CartItem[] = [];

  constructor() {
    this.items = [
       { id: 1, name: 'Product A', price: 50, quantity: 2 },
       { id: 2, name: 'Product B', price: 30, quantity: 1 }
     ];
  }

  getCartItems(): CartItem[] {
    return this.items;
  }

  addItem(item: CartItem) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.push({ ...item });
    }
  }

  removeItem(itemId: number) {
    this.items = this.items.filter(i => i.id !== itemId);
  }

  clearCart() {
    this.items = [];
  }

  getSubtotal(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  getTax(): number {
    return +((this.getSubtotal() * 0.1).toFixed(2)); // e.g. 10% tax
  }

  getTotal(): number {
    return +(this.getSubtotal() + this.getTax()).toFixed(2);
  }

}
