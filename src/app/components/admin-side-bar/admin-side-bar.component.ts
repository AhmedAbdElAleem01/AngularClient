import { Component } from '@angular/core';
import { AuthService } from '../user_Auth/services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-side-bar',
  standalone: false,
  templateUrl: './admin-side-bar.component.html',
  styleUrl: './admin-side-bar.component.css'
})
export class AdminSideBarComponent {

  constructor(private authService:AuthService , private router: Router){}

  logout() {
    this.authService.logout();
    this.router.navigate(["/home"]);
  }

}
