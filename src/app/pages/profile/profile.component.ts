import { Component } from '@angular/core';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { OnInit } from '@angular/core';
import { UserControllerService, UserDTO } from 'src/app/services/api-service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserControllerService) {}

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





  user?: UserDTO; 

  ngOnInit(): void {
    this.userService.me().subscribe(
      p=>{
        this.user = p;
        console.log(this.user);
      }
    )
  }
  


}
