import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing-details',
  standalone: false,
  templateUrl: './billing-details.component.html',
  styleUrl: './billing-details.component.css'
})
export class BillingDetailsComponent {
  constructor(private router: Router){}

  onPlaceOrderClicked(){
    this.router.navigate(['/checkout/confirm']);
  }
}
