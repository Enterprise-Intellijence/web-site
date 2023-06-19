import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDTO } from '../services/api-service/model/userDTO';
import { UserControllerService } from '../services/api-service/api/userController.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  
  visitedUserProfile?: BehaviorSubject<UserDTO | undefined> = new BehaviorSubject<UserDTO | undefined>(undefined);
  currentUserProfile?: BehaviorSubject<UserDTO | undefined> = new BehaviorSubject<UserDTO | undefined>(undefined);

  public get currentUser(): UserDTO | undefined {
    return this.currentUserProfile?.value;
  }

  public get visitedUser(): UserDTO | undefined {
    return this.visitedUserProfile?.value;
  }
  
  constructor(private userControllerService: UserControllerService) {
    this.loadCurrentUser();
  }

  updateProfile() {
    this.currentUserProfile?.next(this.currentUser);
  }

  private loadCurrentUser() {
    this.userControllerService.me().subscribe(p=>{
      this.currentUserProfile?.next(p);
    });
  }

  public loadVisitedUserProfile(id: string) {
    this.userControllerService.userById(id).subscribe(p=>{
      this.visitedUserProfile?.next(p);
    });
  }
}
