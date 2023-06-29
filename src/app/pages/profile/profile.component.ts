import { Component } from '@angular/core';
import { faCircleExclamation, faEnvelope, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { OnInit } from '@angular/core';
import { FollowingControllerService, UserBasicDTO, UserControllerService, UserDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  faCircleExclamation = faCircleExclamation;

  userId: string | null = null;
  isFollowing: boolean = false;

  isCurrentUser: boolean = false;

  visitedUser?: UserBasicDTO;
  get userImage() { return this.visitedUser?.photoProfile?.urlPhoto; }
  emptyBio: string = 'Wow, such empty.';
  faEnvelope = faEnvelope;
  faUserPlus = faUserPlus;

  constructor(
    private route: ActivatedRoute,
    private currentUserService: CurrentUserService,
    private userService: UserControllerService,
    private followingService: FollowingControllerService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') ?? null;

      this.isCurrentUser = this.userId == 'me';

      if (this.userId == 'me') {

        this.currentUserService.userBasic$.subscribe(user => {

          if ((this.userId! in ['me', user?.id]) && user != null) {
            this.visitedUser = user;
          }
        })
      } else if (this.userId != undefined) {
        this.userService.userById(this.userId).subscribe(user => {
          console.log("profile page user: ", user);

          if (user != null) {
            this.visitedUser = user;
            this.isCurrentUser = (this.currentUserService.user?.id == this.visitedUser?.id)

            if (!this.isCurrentUser) {
              this.followingService.imFollowingThisUser(this.visitedUser?.id!).subscribe(isFollowing => {
                this.isFollowing = isFollowing;
              });
            }
          }
        });
      }
    });
  }

  follow() {
    if (this.visitedUser?.id) {
      this.followingService.follow(this.visitedUser.id).subscribe(() => {
        this.isFollowing = true;
      });

      this.visitedUser.followersNumber = (this.visitedUser.followersNumber ?? 0) + 1;
    }
  }

  unfollow() {
    if (this.visitedUser?.id) {
      this.followingService.unfollow(this.visitedUser.id).subscribe(() => {
        this.isFollowing = false;
      });

      this.visitedUser.followersNumber = (this.visitedUser.followersNumber ?? 0) - 1;
    }
  }
}
