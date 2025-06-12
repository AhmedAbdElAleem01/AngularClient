import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    // Check if user is already logged in
    if (this.authService.isLoggedIn()) {
          console.log('User already logged in, redirecting...');
      this.redirectBasedOnRole();
    }
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const loginData = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };

      console.log('Attempting login with:', { email: loginData.email });

      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Login successful:', {
            token: response.token ? 'Token received' : 'No token',
            user: response.user,
            authorities: response.user?.authorities
          });
          
          this.isLoading = false;
          
          // Small delay to ensure data is stored properly
          setTimeout(() => {
            this.redirectBasedOnRole();
          }, 100);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.isLoading = false;
          this.errorMessage = 'Email or password not valid';
          
          // Additional error details for debugging
          if (error.error?.message) {
            console.log('Backend error message:', error.error.message);
          }
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

 private redirectBasedOnRole(): void {
    // Get fresh user data
    const userData = this.authService.getUserData();
    const isAdmin = this.authService.isAdmin();
    
    console.log('Redirect check:', {
      userData: userData,
      authorities: userData?.authorities,
      isAdmin: isAdmin,
      isLoggedIn: this.authService.isLoggedIn()
    });

    if (isAdmin) {
      console.log('Redirecting to admin panel...');
      this.router.navigate(['/admin']).then(success => {
        console.log('Admin navigation result:', success);
      });
    } else {
      console.log('Redirecting to home...');
      this.router.navigate(['/home']).then(success => {
        console.log('Home navigation result:', success);
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  // Getter methods for form validation
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}