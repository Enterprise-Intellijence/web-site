import { Component } from '@angular/core';
import { faCircleExclamation, faEnvelope, faUserPlus } from '@fortawesome/free-solid-svg-icons';
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
  userImage?: string = '';
  emptyBio: string = 'Wow, such empty.';
  faEnvelope = faEnvelope;
  faUserPlus = faUserPlus;

  constructor(
    private route: ActivatedRoute,
    private currentUserService: CurrentUserService,
    private userProfileService: UserProfileService,
    private followingService: FollowingControllerService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') ?? null;

      if (this.userId == 'me') {
        this.currentUserService.user$.subscribe(user => {
          this.user = user;
          this.visitedUser = user as UserBasicDTO;
          this.userImage = this.visitedUser?.photoProfile?.urlPhoto;
          this.visitedUser!.bio = this.visitedUser?.bio ?? this.emptyBio;
        })
      } else {
        this.userProfileService.loadVisitedUserProfile(this.userId ?? '');
        this.userProfileService.visitedUserProfile$.subscribe(user => {
          this.userImage = this.visitedUser?.photoProfile?.urlPhoto;
          this.visitedUser = user;
          this.visitedUser!.bio = this.visitedUser?.bio ?? this.emptyBio;

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
        this.isFollowing = false;
      });

      this.visitedUser.followersNumber = (this.visitedUser.followersNumber ?? 0) - 1;
      this.userProfileService.visitedUserProfile$.next(this.visitedUser);
    }
  }
}
