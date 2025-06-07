import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';

@Component({
  standalone: false,
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {
  searchText = '';
  users:any[] = [];
  page: number = 1;
  itemsPerPage: number = 7;

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  searchByName() {
    if (this.searchText.trim() === '') {
      this.users=[]; 
      this.loadUsers(); //reset users list
    } else {
      this.users = this.users.filter(user => 
        user.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  loadUsers() {
      this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

}
