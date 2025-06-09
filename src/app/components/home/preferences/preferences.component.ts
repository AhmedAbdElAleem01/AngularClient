import {Component, Input} from '@angular/core';
import {CategoryDTO} from '../../../models/categoryDTO';

@Component({
  selector: 'app-preferences',
  standalone: false,
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent {
  @Input() prefs: CategoryDTO[] = [];
}
