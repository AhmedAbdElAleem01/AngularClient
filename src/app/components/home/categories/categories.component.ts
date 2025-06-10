import {Component, Input} from '@angular/core';
import {CategoryDTO} from '../../../models/categoryDTO';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  @Input() categories: CategoryDTO[] = [];
}
