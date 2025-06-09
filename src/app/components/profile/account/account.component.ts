import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile-service';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  accountForm!:FormGroup;
  user:any={};
  status:any = null;

  constructor(private profileService: ProfileService ,private fb:FormBuilder){
    this.initForm();
  }
  initForm() {
    this.user = JSON.parse(localStorage.getItem('currentUser')!);
    this.accountForm = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(1)]],
      username: [this.user.username, [Validators.required, Validators.minLength(1)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      mobile: [this.user.phoneNumber, [Validators.required, Validators.minLength(11)]],
      creditLimit: [this.user.creditLimit, [Validators.required, Validators.min(0)]],
    });
  }
  onSubmit() {
     if (this.accountForm.valid) {
        const body = {
          id: this.user.id,
          name: this.accountForm.get('name')?.value,
          email: this.accountForm.get('email')?.value,
          phoneNumber: this.accountForm.get('mobile')?.value,
          creditLimit: this.accountForm.get('creditLimit')?.value,
          birthDate: this.user.birthDate,
          job: this.user.job,
          createdAt: this.user.createdAt,
          username: this.accountForm.get('username')?.value,
          authorities: this.user.authorities
        }
        this.profileService.updateUserAccountDetails(this.user.id , body).subscribe({
          next: (response)=>{
            this.status = 'success';
          },
          error: (err)=>{
            this.status = 'error';
            console.log("Error updating user: " , err);
          }
        });     
     }else{
        console.log("Form is invalid");
     }
  }
  
  close() {
    this.status=null;
  }

}
