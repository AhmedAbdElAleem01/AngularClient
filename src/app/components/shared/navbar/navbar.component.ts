import { Component } from '@angular/core';
import { AuthService } from '../../user_Auth/services/Auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loggedIn: boolean = false;
  cartCount: number = 0;
  currentUser:any={};

  constructor(private authService:AuthService) {
    this.authService.loggedIn$.subscribe(state => {
      this.loggedIn = state;
    });
  }

  logout(){
    this.authService.logout();
  }
}
