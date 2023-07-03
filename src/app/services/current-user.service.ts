import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserBasicDTO, UserControllerService, UserDTO } from './api-service';
import { ApiAuthService } from './api-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {


  user: UserDTO | null = null;
  user$ = new BehaviorSubject<UserDTO | null>(null);

  userBasic$ = new BehaviorSubject<UserBasicDTO | null>(null);

  constructor(private userService: UserControllerService,
              private apiAuth: ApiAuthService) {
    this.apiAuth.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn)
        this.getUser();
    });
  }

  getUser() {
    this.userService.me().subscribe({
      next: (user) => {
        this.user = user;
        this.user$.next(user);
        this.userService.userById(user.id!).subscribe({
          next: (userBasic) => {
            this.userBasic$.next(userBasic);
          }
        });
      }
    });
  }

  updateUser(user: UserDTO) {
    this.userService.replaceUser(user, user.id ?? '').subscribe({
      next: () => {
        this.user = user;
        this.user$.next(user);
        console.log(user);
      }
    });
  }
}
