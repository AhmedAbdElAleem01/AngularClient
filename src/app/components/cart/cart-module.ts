import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartLayoutComponent } from './cart-layout/cart-layout.component';
import { CartEmptyComponent } from './cart-empty/cart-empty.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import {RouterModule, Routes} from '@angular/router';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  { path: '', component: ListComponent }
];


@NgModule({
  declarations: [
    CartLayoutComponent,
    CartEmptyComponent,
    OrderSummaryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  exports: [
    OrderSummaryComponent
  ]
})
export class CartModule { }
