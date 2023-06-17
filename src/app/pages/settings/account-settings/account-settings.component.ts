import { Component } from '@angular/core';
@Component({
  selector: 'account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {

  email?: string;
  profileName?: string = 'Your current profile name';
  
  constructor() {}
}
