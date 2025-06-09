import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { AccountComponent } from './account/account.component';
import { PasswordComponent } from './password/password.component';
import { ProfileNavbarComponent } from './profile-navbar/profile-navbar.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  {path: "address" , component: AddressComponent},
  {path: "account" , component: AccountComponent},
  {path: "password" , component: PasswordComponent},
];
@NgModule({
  declarations: [
    ProfileNavbarComponent,
    AddressComponent,
    AccountComponent,
    PasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ProfileModule { }
