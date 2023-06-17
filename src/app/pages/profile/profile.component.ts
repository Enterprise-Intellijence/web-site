import { Component } from '@angular/core';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { OnInit } from '@angular/core';
import { UserBasicDTO, UserControllerService, UserDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  faCircleExclamation = faCircleExclamation;


  currentUserId: string | null = null;
  userId: string | null = null;


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

}
