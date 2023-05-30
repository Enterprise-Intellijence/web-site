import { Component } from '@angular/core';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor() {}
  
  // TODO: Get profile pic from user service
  profilePic: String = "";

}
