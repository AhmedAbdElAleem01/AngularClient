import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserModule} from '@angular/platform-browser';
<<<<<<< Updated upstream
import {FormsModule} from '@angular/forms';
import {provideHttpClient} from '@angular/common/http';
=======
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {provideHttpClient ,HTTP_INTERCEPTORS } from '@angular/common/http';
>>>>>>> Stashed changes
import {RatingStarsPipe} from './pipes/rating-star-pipe';
import {ProductFilterPipe} from './pipes/product-filter-pipe';
import {AppRoutingModule} from './app-routing-module';
import {RouterModule} from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminSideBarComponent } from './components/admin-side-bar/admin-side-bar.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
<<<<<<< Updated upstream
import { ListComponent } from './components/cart/list/list.component';
import {SharedModule} from './components/shared/shared-module';

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, AdminSideBarComponent, MainLayoutComponent, ListComponent],
  imports: [BrowserModule, RouterModule, FormsModule, RatingStarsPipe, ProductFilterPipe, AppRoutingModule, SharedModule],
  providers: [provideHttpClient()],
=======
import { RegisterComponent } from './components/user_Auth/Registration/register.component';
import { LoginComponent } from './components/user_Auth/Login/login.component';
// Services and Interceptors
import { AuthService } from './components/user_Auth/services/Auth.service';
import { AuthInterceptor } from './components/user_Auth/Interceptor/Auth.Interceptor';
import { AuthGuard, AdminGuard } from './components/user_Auth/Interceptor/Auth.Guard';
@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent, AdminLayoutComponent, AdminSideBarComponent, MainLayoutComponent,RegisterComponent ,LoginComponent],
  imports: [BrowserModule, RouterModule, ReactiveFormsModule,FormsModule, RatingStarsPipe, ProductFilterPipe, AppRoutingModule],
  providers: [provideHttpClient(), AuthService, AuthGuard,AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
>>>>>>> Stashed changes
  bootstrap: [AppComponent],
})
export class AppModule {}
