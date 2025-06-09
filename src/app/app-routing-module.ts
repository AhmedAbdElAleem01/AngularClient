import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'products',
    loadChildren : () => import("../app/components/products/products-module")
      .then(m => m.ProductsModule)
  },
  {
    path: '',
    loadChildren : () => import("../app/components/home/home-module")
      .then(m => m.HomeModule)
  },

  {
    path: 'cart',
    loadChildren : () => import("./components/cart/cart-module")
      .then(m => m.CartModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
