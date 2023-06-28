import { Component } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
    arrowDown = faChevronDown
    faCreditCard = faCreditCard
    faUser = faUser
    faLocationDot = faLocationDot
    faBars = faBars
}


