import { Component } from '@angular/core';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor() {}

  faCircleExclamation = faCircleExclamation;
  
  // TODO: Get user info from user service
  currentUserId: String = "";
  
  visitedUserId: String = "";
  profilePic: String = "";
  profileName: String = "John Doe";
  followers: Number = 0;
  following: Number = 0;
  reviews: Number = 0;
  isFollowing: Boolean = false;


}
