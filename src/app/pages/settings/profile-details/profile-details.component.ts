import { Component } from '@angular/core';

@Component({
  selector: 'profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent {

  constructor() {}

  // TODO: Get profile pic from user service
  profilePic: String = "";

}
