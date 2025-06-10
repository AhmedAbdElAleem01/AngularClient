import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-add-form',
  standalone: false,
  templateUrl: './products-add-form.component.html',
  styleUrl: './products-add-form.component.css'
})
export class ProductsAddFormComponent {
  productForm!:FormGroup;
  selectedImage: File | null = null;
  imagePreview: string = ''; 
  status:any = null;

  constructor(private router: Router, private productService:ProductService , private fb: FormBuilder ,private location:Location) {
    this.initForm();
  }

  initForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['Cakes', Validators.required],
      price: [, [Validators.required, Validators.min(0)]],
      stock: [, [Validators.min(0), Validators.required]],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
    });
  }
  
  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }   
  }
  chooseAnotherImage() {
    const input = document.getElementById('imageInput') as HTMLInputElement;
    input.click();
  }
  onSubmit() {
    if (this.productForm.valid && this.selectedImage) {       
      const formData = new FormData();
      const product = {
        name: this.productForm.get('productName')?.value,
        categoryName: this.productForm.get('category')?.value,
        price: this.productForm.get('price')?.value,
        description: this.productForm.get('description')?.value || '',
        stockQuantity: this.productForm.get('stock')?.value || 0,
        ingredients: this.productForm.get('ingredients')?.value || '', 
      }
      formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
      formData.append('product.image', this.selectedImage ,this.selectedImage.name);
      
      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          this.status = 'error';
          console.error('Error adding product:', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
  goBack() {
    this.location.back();
  }
    close() {
    this.status=null;
  }

}
