import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/product';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  constructor(private _route:ActivatedRoute, private _httpService: ProductService) {}

  productId: string | null = null

  product?: Product;

  quantity: number = 1;

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) this.quantity--;
  }

  ngOnInit(): void {

    this._route.paramMap.subscribe(paramMap => {
       this.productId = paramMap.get("id");
       if(this.productId){
          this._httpService.getProductById(+this.productId).subscribe(
            product => {
              this.product = product;
              alert(JSON.stringify(this.product));
            }
          );
       }
    })
  }


}
