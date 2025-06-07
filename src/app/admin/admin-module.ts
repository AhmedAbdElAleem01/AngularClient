import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserOrdersComponent } from './users/user-orders/user-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsAddFormComponent } from './products/products-add-form/products-add-form.component';
import { ProductsEditFormComponent } from './products/products-edit-form/products-edit-form.component';

const routes: Routes = [
  {path: "products" , component: ProductsListComponent},
  {path:"products/add" , component: ProductsAddFormComponent},
  {path:"products/edit/:id" , component: ProductsEditFormComponent},
  {path:"orders" , component: OrdersListComponent},
  {path:"orders/:id", component: OrderDetailsComponent},
  {path:"users" , component:UsersListComponent},
  {path:"users/orders/:id", component: UserOrdersComponent},
];
@NgModule({
  declarations: [
    ProductsListComponent, 
    OrdersListComponent, 
    OrderDetailsComponent, 
    UsersListComponent, 
    UserOrdersComponent, 
    ProductsAddFormComponent,
    ProductsEditFormComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    provideHttpClient(),
  ],
})
export class AdminModule { }
