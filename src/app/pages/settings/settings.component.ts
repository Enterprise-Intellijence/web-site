import { Component } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
    arrowDown = faChevronDown
}


