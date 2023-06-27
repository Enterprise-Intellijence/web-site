import { Component } from '@angular/core';
import { UserDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';
@Component({
  selector: 'account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {

  user: UserDTO | null = null;
  
  constructor(private currentUserService: CurrentUserService) {}

  ngOnInit(): void {
    this.currentUserService.user$.subscribe(user => {
      this.user = user;
    });
  }

  save() {
    console.log('Saving...');
    this.currentUserService.updateUser(this.user as UserDTO);
  }
}
