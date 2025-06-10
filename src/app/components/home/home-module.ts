import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BannerComponent} from './banner/banner.component';
import { HomeComponent } from './home/home.component';
import {SharedModule} from '../shared/shared-module';
import { ClassicFavoritesComponent } from './classic-favorites/classic-favorites.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { CategoriesComponent } from './categories/categories.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [BannerComponent, HomeComponent, ClassicFavoritesComponent, PreferencesComponent, CategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class HomeModule { }
