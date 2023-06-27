import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FollowingControllerService, UserBasicDTO, UserControllerService } from './api-service';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  
  visitedUserProfile$: BehaviorSubject<UserBasicDTO | undefined> = new BehaviorSubject<UserBasicDTO | undefined>(undefined);
  isFollowing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private userService: UserControllerService) {}

  public loadVisitedUserProfile(id: string): void {
    this.userService.userById(id).subscribe(user => {
      this.visitedUserProfile$.next(user);
    });
  }
}
