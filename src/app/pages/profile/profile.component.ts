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


  user?: UserBasicDTO;


  isFollowing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserControllerService,
    private currentUserService: CurrentUserService,) { }

  ngOnInit(): void {
    // example route with id: http://localhost:4200/users/1
    // example route: http://localhost:4200/users/me

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') ?? null;
      if(this.userId != null)
        this.userService.userById(this.userId).subscribe(user => this.user = user);
      else
        this.loadCurrentUser();
    });

    this.currentUserService.user$.subscribe(user => this.currentUserId = user?.id ?? null);
  }

  loadCurrentUser() {
    console.log(`loadCurrentUser()`);

    this.currentUserService.user$.subscribe(user => {
      if (user) {
        this.userId = user.id ?? null;
        this.user = user;
      }
    });
  }

  public get isCurrentUser(): boolean {
    return this.userId !== null && this.currentUserId === this.userId;
  }
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