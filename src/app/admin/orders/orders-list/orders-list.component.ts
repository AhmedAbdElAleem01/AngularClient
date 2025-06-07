import { Component } from '@angular/core';
import { OrderService } from '../../services/order-service';

@Component({
  selector: 'app-orders-list',
  standalone: false,
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {
  orders: any[] = [];
  page: number = 1;
  itemsPerPage: number = 7;

  constructor(private orderService:OrderService) {
    this.loadOrders();
  }
  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }



}
