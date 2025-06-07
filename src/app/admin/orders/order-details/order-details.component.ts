import { Component } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  order:any = {};
  orderItems:any = [];
  address:any = {};
  userId: number = 0;

  constructor(private orderService: OrderService, private route: ActivatedRoute ,private location: Location) {
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    this.route.paramMap.subscribe((params) => {
      const orderId = +params.get('id')!;
      this.orderService.getOrderDetailsById(orderId).subscribe({
        next: (response) => {
          this.orderItems = response;
        },
        error: (err) => {
          console.error('Error fetching order details:', err);
        }
      });
      this.orderService.getOrderById(orderId).subscribe({
        next: (response) => {
          this.order = response;
          this.userId = response.userId; 
          this.loadShippingAddress(this.userId)
        },
        error: (err) => {
          console.error('Error fetching order:', err);
        }
      });
    });
  }
  
  loadShippingAddress(userId: number) {
    this.orderService.getShippingAddress(userId).subscribe({
      next: (response) => {
        this.address = response;
      },
      error: (err) => {
        console.error('Error fetching shipping address:', err);
      }
    });
  }

  goBack() {
    this.location.back();
  }
}

