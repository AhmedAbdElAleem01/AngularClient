import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile-service';

@Component({
  selector: 'app-address',
  standalone: false,
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  addressForm!:FormGroup;
  address:any={};
  status:any = null;
  user = JSON.parse(localStorage.getItem('currentUser')!);

  constructor(private profileService: ProfileService ,private fb:FormBuilder){
    this.loadAddress();
  }
  initForm() {
    this.addressForm = this.fb.group({
      country: [this.address.country, [Validators.required, Validators.minLength(1)]],
      city: [this.address.city, [Validators.required, Validators.minLength(1)]],
      street: [this.address.street, [Validators.required, Validators.minLength(1)]],
      buildingNo: [this.address.buildingNo, [Validators.required, Validators.minLength(1)]],
    });
  }
  loadAddress() {
    this.profileService.getShippingAddress(this.user.id).subscribe({
      next: (response) =>{
        this.address = response;
        this.initForm();
      },
      error: (err) => {
        console.error('Error fetching user address:', err);
      }          
    });
  }
  onSubmit() {
     if (this.addressForm.valid) {
        const body = {
          id: this.address.id,
          userId: this.address.userId,
          country: this.addressForm.get('country')?.value,
          city: this.addressForm.get('city')?.value,
          street: this.addressForm.get('street')?.value,
          buildingNo: this.addressForm.get('buildingNo')?.value,
        }
        this.profileService.updateAddress(this.address.id , body).subscribe({
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
