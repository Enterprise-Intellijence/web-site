import { Component } from '@angular/core';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { OnInit } from '@angular/core';
import { UserBasicDTO, UserControllerService, UserDTO, UserImageDTO } from 'src/app/services/api-service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userControllerService: UserControllerService,
              private activatedRoute: ActivatedRoute,
              private userProfileService: UserProfileService) {}

  faCircleExclamation = faCircleExclamation;

  visitedUserProfile?: UserDTO;
  currentUserProfile?: UserDTO;

  private routeSubscription?: Subscription;

  ngOnInit(): void {

    this.userProfileService.currentUserProfile?.subscribe(p=>{
      this.currentUserProfile = p;
    });

    if (this.activatedRoute.snapshot.params['id']) {
      this.routeSubscription = this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        this.userProfileService.loadVisitedUserProfile(id);
        this.userProfileService.visitedUserProfile?.subscribe(p=>{
          this.visitedUserProfile = p;
          console.log(this.visitedUserProfile);
        });
      });
    }
  }
}