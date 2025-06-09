import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-edit-form',
  standalone: false,
  templateUrl: './products-edit-form.component.html',
  styleUrl: './products-edit-form.component.css'
})
export class ProductsEditFormComponent {
  productForm!: FormGroup;
  product:any={};
  status:any = null;

  constructor(private productService:ProductService , private location:Location , private route: ActivatedRoute , private fb:FormBuilder){
    this.loadProduct();
    this.initForm();
  }
  loadProduct() {
    this.route.paramMap.subscribe((params) => {
      const productId = +params.get('id')!;
      this.productService.getProductById(productId).subscribe({
        next: (response) => {
          this.product = response;
          this.initForm();
        },
        error: (err) => {
          console.error('Error fetching product:', err);
        }
      });
    });
  }
    initForm() {
    this.productForm = this.fb.group({
      productName: [this.product.name, Validators.required],
      category: [this.product.categoryName, Validators.required],
      price: [this.product.price, [Validators.required, Validators.min(0)]],
      stock: [this.product.stockQuantity, [Validators.min(0), Validators.required]],
      description: [this.product.description, Validators.required],
      ingredients: [this.product.ingredients, Validators.required],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {       
        const updatedProduct = {
          name: this.productForm.get('productName')?.value,
          categoryName: this.productForm.get('category')?.value,
          price: this.productForm.get('price')?.value,
          description: this.productForm.get('description')?.value || '',
          stockQuantity: this.productForm.get('stock')?.value || 0,
          ingredients: this.productForm.get('ingredients')?.value || '', 
        }        
        this.productService.updateProduct(this.product.id , updatedProduct).subscribe({
          next: (response) => {
            this.status = 'success';
            this.productForm.reset();
          },
          error: (err) => {
            this.status = 'error';
            console.error('Error updating product:', err);
          }
        });
      } else {
        console.log('Form is invalid: ' , this.productForm.value);
      }
  }
  
  goBack() {
    this.location.back();
  }
  
  close() {
    this.status=null;
  }
}
