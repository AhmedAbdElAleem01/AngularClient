import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../models/product';
import {ProductDTO} from '../models/productDTO';

@Pipe({
  name: 'productFilter',
  pure: false,
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: ProductDTO[], filters: any): ProductDTO[] {
    if (!products || !filters) return products;

    return products.filter(p =>
      (!filters.category || (p.categoryName && p.categoryName.toLowerCase().includes(filters.category.toLowerCase()))) &&
      (!filters.title || (p.name && p.name.toLowerCase().includes(filters.title.toLowerCase()))) &&
      (p.price !== undefined && p.price >= filters.minPrice) &&
      (p.price <= filters.maxPrice)
    );
  }
}

