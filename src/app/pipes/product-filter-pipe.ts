import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../models/product';

@Pipe({
  name: 'productFilter',
  pure: false
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: Product[], filters: any): Product[] {
    if (!products || !filters) return products;

    return products.filter(p =>
      (!filters.category || p.category.toLowerCase().includes(filters.category.toLowerCase())) &&
      (!filters.title || p.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (p.price >= filters.minPrice) &&
      (p.price <= filters.maxPrice)
    );
  }

}
