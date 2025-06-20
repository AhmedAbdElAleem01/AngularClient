import { Component } from '@angular/core';
import {CartService} from '../cart-service';
import { Router } from '@angular/router';

@Component({
  selector: 'order-summary',
  standalone: false,
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent {

  subtotal = 0;
  tax = 0;
  total = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.calculate();
  }

  calculate() {
    this.subtotal = this.cartService.getSubtotal();
    this.tax = this.cartService.getTax();
    this.total = this.cartService.getTotal();
  }

  onCheckout() {
    // Here you’d typically check if user is logged in; redirect otherwise.
    console.log('Proceed to checkout. Total:', this.total);
  }

  onCheckoutClick(): void {
    this.router.navigate(['/checkout']);
  }
}
