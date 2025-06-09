import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import {FormsModule} from '@angular/forms';
import {provideHttpClient} from '@angular/common/http';
import {RatingStarsPipe} from './pipes/rating-star-pipe';
import {ProductFilterPipe} from './pipes/product-filter-pipe';
import {AppRoutingModule} from './app-routing-module';
import {RouterModule} from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminSideBarComponent } from './components/admin-side-bar/admin-side-bar.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ListComponent } from './components/cart/list/list.component';


@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent, AdminLayoutComponent, AdminSideBarComponent, MainLayoutComponent, ListComponent],
  imports: [BrowserModule, RouterModule,FormsModule, RatingStarsPipe, ProductFilterPipe, AppRoutingModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
