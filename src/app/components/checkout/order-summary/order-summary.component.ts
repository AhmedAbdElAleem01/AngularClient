import { Component, OnInit } from '@angular/core';
import { CartItemDetailsDTO } from '../../../models/cartItemDetailsDTO';
import { CheckoutService } from '../../../services/checkout-service';
import { BillingDetailsDTO } from '../../../models/billingDetailsDTO';

@Component({
  selector: 'app-order-summary',
  standalone: false,
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  cartItems: CartItemDetailsDTO[] = [];
  totalCost: number = 0;
  user: any;

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId') || '66');
    
    this.checkoutService.getOrderSummary(userId).subscribe({
      next: (data) => {
        this.cartItems = data.cartItems;
        this.totalCost = data.totalCost;
        this.user = data.user;
      },
      error: (err) => {
        console.error('Error fetching order summary:', err);
      }
    });
  }
}