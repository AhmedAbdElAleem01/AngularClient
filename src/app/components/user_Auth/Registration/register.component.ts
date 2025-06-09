import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  interests: string[] = ['Cakes', 'Cupcakes', 'Donuts', 'Bakery'];
  selectedInterests: string[] = [];
  emailExists = false;
  usernameExists = false;
  submissionError = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], // Exactly 10 digits
      birthDate: ['', Validators.required],
      job: [''],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      creditLimit: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      buildingNumber: ['']
    });
  }

  onInterestChange(event: any): void {
    const interest = event.target.value;
    if (event.target.checked) {
      this.selectedInterests.push(interest);
    } else {
      this.selectedInterests = this.selectedInterests.filter(i => i !== interest);
    }
  }

  checkEmail(): void {
    const email = this.registerForm.get('email')?.value;
    if (email) {
      this.userService.checkEmail(email).subscribe({
        next: (res: string) => {
          this.emailExists = res.includes('already registered');
        },
        error: (err) => {
          console.error('Email check error:', err);
        }
      });
    }
  }

  checkUsername(): void {
    const username = this.registerForm.get('username')?.value;
    if (username) {
      this.userService.checkUsername(username).subscribe({
        next: (res: string) => {
          this.usernameExists = res.includes('already taken');
        },
        error: (err) => {
          console.error('Username check error:', err);
        }
      });
    }
  }

  checkPhone(): void {
    const phone = this.registerForm.get('phone')?.value;
    if (phone && !/^\d{11}$/.test(phone)) {
      this.registerForm.get('phone')?.setErrors({ invalidPhone: true });
    }
  }

  // Convert date from yyyy-MM-dd to MM-dd-yyyy format
  private formatDateForBackend(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  onSubmit(): void {
    this.submissionError = '';
    this.registerForm.markAllAsTouched();
    
    console.log('Form valid:', this.registerForm.valid);
    console.log('Form errors:', this.getFormValidationErrors());
    
    if (this.registerForm.invalid) {
      this.submissionError = 'Please fill all required fields correctly.';
      return;
    }
    
    if (this.emailExists || this.usernameExists) {
      this.submissionError = 'Email or username already exists.';
      return;
    }

    this.isSubmitting = true;
    const formValues = this.registerForm.value;
    
    // Format data exactly as backend DTO expects
    const data = {
      fname: formValues.firstName,
      lname: formValues.lastName,
      phoneNumber: formValues.phone, // Must be exactly 10 digits
      birthdate: this.formatDateForBackend(formValues.birthDate), // Convert to MM-dd-yyyy
      job: formValues.job || '', // Can be empty
      email: formValues.email,
      username: formValues.username,
      password: formValues.password,
      creditLimit: formValues.creditLimit, // Keep as string
      country: formValues.country,
      city: formValues.city,
      street: formValues.street,
      buildingNo: formValues.buildingNumber || '', // Can be empty
      interests: this.selectedInterests.length > 0 ? this.selectedInterests : [] // Ensure it's an array
    };

    console.log('Sending data to API:', JSON.stringify(data, null, 2));

    this.userService.registerUser(data).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        alert('🎉 Registration successful! Welcome!');
        this.registerForm.reset();
        this.selectedInterests = [];
        this.router.navigate(['/login']);
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Registration error details:', err.error);
        let errorMessage = 'Registration failed. ';
        
        if (err.error && typeof err.error === 'object') {
          // Handle validation errors from backend
          if (err.error.message) {
            errorMessage += err.error.message;
          } else {
            errorMessage += 'Please check your input and try again.';
          }
        } else if (err.error && typeof err.error === 'string') {
          errorMessage += err.error;
        } else {
          errorMessage += 'Please try again.';
        }
        
        this.submissionError = errorMessage;
        this.isSubmitting = false;
      }
    });
  }

  // Helper method to see form validation errors
  private getFormValidationErrors(): any {
    const formErrors: any = {};
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors = this.registerForm.get(key)?.errors;
      if (controlErrors) {
        formErrors[key] = controlErrors;
      }
    });
    return formErrors;
  }
}
