import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutService } from '../../../services/checkout-service';

@Component({
  selector: 'app-billing-details',
  standalone: false,
  templateUrl: './billing-details.component.html',
  styleUrl: './billing-details.component.css'
})
export class BillingDetailsComponent implements OnInit {
  billingForm!: FormGroup;
  errorMessage: string | null = null;
  user = JSON.parse(localStorage.getItem('currentUser')!);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
    this.billingForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      phone: ['', [Validators.required, Validators.pattern("^01[0-2,5]\\d{8}$")]],
      country: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern("^[A-Za-z]+([\\s-][A-Za-z]+)*$")]],
      street: ['', [Validators.required, Validators.pattern("^[A-Za-z]+([\\s-][A-Za-z]+)*$")]],
      building: ['', Validators.required],
    });

    this.checkoutService.getBillingDetails(this.user.id).subscribe({
      next: (data) => {
        const user = data.billingDetails;
        const buildingValue = user.buildingNumber === -1 ? '' : user.buildingNumber;
        this.billingForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          country: user.country,
          city: user.city,
          street: user.street,
          building: buildingValue
        });
      },
      error: (err) => {
        console.error('Error fetching billing details:', err);
      }
    });
  }

  onPlaceOrderClicked() {
    if (this.billingForm.valid) {
      const billingData = {
        name: this.billingForm.get('name')?.value,
        email: this.billingForm.get('email')?.value,
        phone: this.billingForm.get('phone')?.value,
        country: this.billingForm.get('country')?.value,
        city: this.billingForm.get('city')?.value,
        street: this.billingForm.get('street')?.value,
        buildingNumber: this.billingForm.get('building')?.value,
      };

      this.checkoutService.placeOrder(this.user.id, billingData).subscribe({
        next: (res) => {
          console.log(res);
          this.checkoutService.getOrderSummary(this.user.id).subscribe({
            next: (data) => {
              // get updated user from backend response
              const updatedUser = data.user;
              localStorage.setItem('currentUser', JSON.stringify(updatedUser));
              this.router.navigate(['/checkout/confirm']);
            },
            error: (err) => {
              console.error('Error updating local user data:', err);
              return;
            }
          });

        },
        error: (err) => {
          console.error('Order failed:', err);
          this.errorMessage = err.error || 'An error occurred while placing the order.';
          if ((this.errorMessage === 'Error: The total cost of your cart exceeds your credit limit. Please remove some items or increase your credit to proceed.') || (this.errorMessage === 'Error: Sorry, the requested quantity exceeds the available stock for some products. Please adjust your order accordingly.')) {
            this.router.navigate(['/cart'], {
              state: { errorMessage: this.errorMessage }
            });
          }
        }
      });

    } else {
      this.billingForm.markAllAsTouched();
    }
  }

}