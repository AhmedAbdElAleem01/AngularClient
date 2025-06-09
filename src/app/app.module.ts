import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserModule} from '@angular/platform-browser';
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
import {SharedModule} from './components/shared/shared-module';

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, AdminSideBarComponent, MainLayoutComponent, ListComponent],
  imports: [BrowserModule, RouterModule, FormsModule, RatingStarsPipe, ProductFilterPipe, AppRoutingModule, SharedModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
