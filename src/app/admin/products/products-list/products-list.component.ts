import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  searchText: string = '';
  products: any[] = [];
  page: number = 1;
  itemsPerPage: number = 5;

  constructor(private productService: ProductService) { 
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      } 
    });
  }
  searchProducts() {
    if (this.searchText.trim() === '') {
      this.products=[]; 
      this.loadProducts(); //reset products list
    } else {
      this.products = this.products.filter(product => 
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe({
      next: (response) => {   
        console.log('Product deleted successfully:', response);
      }
      , error: (err) => { 
        console.error('Error deleting product:', err);
      }});  
    this.products = this.products.filter(product => product.id !== productId); 
  }
  

}
