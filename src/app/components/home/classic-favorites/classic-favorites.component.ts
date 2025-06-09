import {Component, Input} from '@angular/core';
import {ProductDTO} from '../../../models/productDTO';


@Component({
  selector: 'app-classic-favorites',
  standalone: false,
  templateUrl: './classic-favorites.component.html',
  styleUrl: './classic-favorites.component.css'
})
export class ClassicFavoritesComponent {
  @Input() products: ProductDTO[] = [];

}
