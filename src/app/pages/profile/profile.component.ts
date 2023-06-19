import { Component } from '@angular/core';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { OnInit } from '@angular/core';
import { FollowingControllerService, UserBasicDTO, UserControllerService, UserDTO, UserImageDTO } from 'src/app/services/api-service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userControllerService: UserControllerService,
              private activatedRoute: ActivatedRoute,
              private userProfileService: UserProfileService,
              private followingControllerService: FollowingControllerService) {}

  faCircleExclamation = faCircleExclamation;

  visitedUserProfile?: BehaviorSubject<UserDTO | undefined> = new BehaviorSubject<UserDTO | undefined>(undefined);
  currentUserProfile?: BehaviorSubject<UserDTO | undefined> = new BehaviorSubject<UserDTO | undefined>(undefined);

  isCurrentUserFollowingVisitedUser: boolean = true;

  private routeSubscription?: Subscription;

  ngOnInit(): void {

    this.userProfileService.currentUserProfile?.subscribe(p=>{
      this.currentUserProfile = p? new BehaviorSubject<UserDTO | undefined>(p) : undefined;
    });

    if (this.activatedRoute.snapshot.params['id']) {
      this.routeSubscription = this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        this.userProfileService.loadVisitedUserProfile(id);
        this.userProfileService.visitedUserProfile?.subscribe(p=>{
          this.visitedUserProfile = p? new BehaviorSubject<UserDTO | undefined>(p) : undefined;
          console.log(this.visitedUserProfile);
        });
      });
    }

    // check if current user is following visited user
  }

  follow() {
    if (this.visitedUserProfile) {

      let visitedUserId: any = this.visitedUserProfile.getValue()?.id;

      this.followingControllerService.follow(visitedUserId).subscribe(p=>{
        this.userProfileService.updateProfile();
      });

      this.userProfileService.loadVisitedUserProfile(visitedUserId);
    }
  }

  unfollow() {
    if (this.visitedUserProfile) {

      let visitedUserId: any = this.visitedUserProfile.getValue()?.id;

      this.followingControllerService.unfollow(visitedUserId).subscribe(p=>{
        this.userProfileService.updateProfile();
      });

      this.userProfileService.loadVisitedUserProfile(visitedUserId);
    }
  }
}