import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { RegisterComponent } from './components/user_Auth/Registration/register.component';
import { LoginComponent } from './components/user_Auth/Login/login.component';
import { AuthGuard, AdminGuard } from './components/user_Auth/Interceptor/Auth.Guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
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
      },
      {
        path: 'home',
        loadChildren : () => import("./components/home/home-module")
          .then(m => m.HomeModule)
      },
      {
        path: 'profile',
        loadChildren : () => import("./components/profile/profile-module")
          .then(m => m.ProfileModule)
      }
    ]
  },  
  // Admin routes (double protected)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule) }
    ]
  },
  
  // Wildcard route (should be last)
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


