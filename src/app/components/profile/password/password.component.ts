import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile-service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  standalone: false,
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {
  passwordForm!:FormGroup;
  status:any = null;
  user = JSON.parse(localStorage.getItem('currentUser')!);

  constructor(private profileService: ProfileService ,private fb:FormBuilder ,private router:Router){
    this.initForm();
  }
  initForm() {
    this.passwordForm = this.fb.group({
      oldPass: ['', [Validators.required, Validators.minLength(1)]],
      newPass: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onSubmit() {
     if (this.passwordForm.valid) {
        const body = new HttpParams()
            .set('oldPassword', this.passwordForm.get('oldPass')?.value)
            .set('newPassword', this.passwordForm.get('newPass')?.value);
        this.profileService.changePassword(this.user.id , body).subscribe({
          next: (response)=>{
            this.status = 'success';

            // invalidate old token and login 
            localStorage.removeItem('authToken');
            this.router.navigate(['/login']);
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

