import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../user_Auth/services/Auth.service';
import {CartPublisher} from '../../../services/cart-publisher';
import {count, Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  loggedIn = false;
  cartCount = 0;
  private subs = new Subscription();

  constructor(
    private auth: AuthService,
    public cartPublisher: CartPublisher
  ) {}

  ngOnInit() {

    this.subs.add(
      this.auth.loggedIn$.subscribe(flag => this.loggedIn = flag)
    );

    this.subs.add(
      this.cartPublisher.cartCount$.subscribe(cnt => this.cartCount = cnt)
    );
  }


  logout() { this.auth.logout(); }
}
