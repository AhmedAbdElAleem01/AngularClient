import {NgModule} from '@angular/core';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
          path: 'products',
          loadChildren : () => import("../app/components/products/products-module")
            .then(m => m.ProductsModule)
      },
      {
        path: 'cart',
        loadChildren : () => import("./components/cart/cart-module")
          .then(m => m.CartModule)
      },
      {
        path: 'checkout',
        loadChildren : () => import("./components/checkout/checkout-module")
          .then(m => m.CheckoutModule)
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
