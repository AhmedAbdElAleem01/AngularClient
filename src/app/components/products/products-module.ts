import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import {FormsModule} from '@angular/forms';
import {ProductFilterPipe} from '../../pipes/product-filter-pipe';
import {RatingStarsPipe} from '../../pipes/rating-star-pipe';
import {RouterModule, Routes} from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';



const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: ':id',
    component: ProductDetailsComponent
  }

];

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductFilterPipe,
    RatingStarsPipe,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
