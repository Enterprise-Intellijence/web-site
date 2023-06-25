import { Component } from '@angular/core';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { OnInit } from '@angular/core';
import { FollowingControllerService, UserBasicDTO, UserControllerService, UserDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  faCircleExclamation = faCircleExclamation;

  userId: string | null = null;

  isFollowing: boolean = false;

  user?: UserDTO | null = null;
  visitedUser?: UserBasicDTO;

  constructor(
    private route: ActivatedRoute,
    private userService: UserControllerService,
    private currentUserService: CurrentUserService,
    private userProfileService: UserProfileService,
    private followingService: FollowingControllerService) { }

  ngOnInit(): void {
    // example route with id: http://localhost:4200/users/1
    // example route: http://localhost:4200/users/me

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') ?? null;

      if (this.userId == 'me') {
        this.currentUserService.user$.subscribe(user => {
          this.user = user;
          this.visitedUser = user as UserBasicDTO;
        })
      } else {
        this.userProfileService.loadVisitedUserProfile(this.userId ?? '');
        this.userProfileService.visitedUserProfile$.subscribe(user => {
          this.visitedUser = user;
          this.followingService.imFollowingThisUser(this.visitedUser?.id ?? '').subscribe(isFollowing => {
            this.isFollowing = isFollowing;
          });
        });
      }
    });
  }

  follow() {
    if (this.visitedUser) {
      this.followingService.follow(this.visitedUser.id ?? '').subscribe(() => {
        this.isFollowing = true;
      });

      this.visitedUser.followersNumber = (this.visitedUser.followersNumber ?? 0) + 1;
      this.userProfileService.visitedUserProfile$.next(this.visitedUser);
    }
  }

  unfollow() {
    if (this.visitedUser) {
      this.followingService.unfollow(this.visitedUser.id ?? '').subscribe(() => {
        this.isFollowing = true;
      });

      this.visitedUser.followersNumber = (this.visitedUser.followersNumber ?? 0) - 1;
      this.userProfileService.visitedUserProfile$.next(this.visitedUser);
    }
  }
}