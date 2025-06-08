import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  {path: "" , component: CheckoutComponent},
  {path: "confirm" , component: ConfirmationComponent}
];

@NgModule({
  declarations: [
    CheckoutComponent,
    BillingDetailsComponent,
    OrderSummaryComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ]
})
export class CheckoutModule { }
