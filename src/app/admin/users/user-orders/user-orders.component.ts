import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-orders',
  standalone: false,
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent {
  orders: any[] = [];
  page: number = 1;
  itemsPerPage: number = 7;

  constructor(private userService: UserService ,private route: ActivatedRoute ,private location: Location) {
    this.loadOrders();
  }
  loadOrders() {
    this.route.paramMap.subscribe((params)=> {
      this.userService.getOrderByCustomerId(+params.get('id')!)
      .subscribe({
        next: (response) => {
          this.orders = response;
        },
        error: (err) => {
          console.error('Error fetching user orders:', err);
        }
      })
    });
  }
  goBack() {
    this.location.back();
  }
}
