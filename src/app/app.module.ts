import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, provideHttpClient} from '@angular/common/http';
import {RatingStarsPipe} from './pipes/rating-star-pipe';
import {ProductFilterPipe} from './pipes/product-filter-pipe';
import {AppRoutingModule} from './app-routing-module';
import {RouterModule} from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminSideBarComponent } from './components/admin-side-bar/admin-side-bar.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ListComponent } from './components/cart/list/list.component';
import {SharedModule} from './components/shared/shared-module';
import { RegisterComponent } from './components/user_Auth/Registration/register.component';
import { LoginComponent } from './components/user_Auth/Login/login.component';

// Services and Interceptors
import { AuthService } from './components/user_Auth/services/Auth.service';
import { AuthInterceptor } from './components/user_Auth/Interceptor/Auth.Interceptor';
import { AuthGuard, AdminGuard } from './components/user_Auth/Interceptor/Auth.Guard';

@NgModule({
  declarations: [AppComponent,AdminLayoutComponent, AdminSideBarComponent, MainLayoutComponent,ListComponent ,RegisterComponent ,LoginComponent],
  imports: [BrowserModule, RouterModule, ReactiveFormsModule,FormsModule, RatingStarsPipe, ProductFilterPipe,SharedModule,AppRoutingModule],
  providers: [provideHttpClient(), AuthService, AuthGuard,AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
