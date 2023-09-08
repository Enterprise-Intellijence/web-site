import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { UserControllerService, UserDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';
@Component({
  selector: 'account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {

  user: UserDTO | null = null;

  oldPassword?: string;
  newPassword?: string;
  emailTyped?: string;
  newUsername?: string;
  newEmail!: string;



  constructor(private currentUserService: CurrentUserService,
    private userService: UserControllerService,
    private apiAuth: ApiAuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.currentUserService.user$.subscribe(user => {
      this.user = user;
    });
  }

  changePassword() {
    if (this.oldPassword && this.newPassword) {
      if (this.oldPassword === this.newPassword) {
        alert("New password must be different from old password");
        return
      }
      if(this.newPassword.length < 8) {
        alert("New password must be at least 8 characters long")
        return
      }

      let observe;
      this.userService.changePassword(this.oldPassword, this.newPassword, observe).subscribe(observe => {
        console.log("res: ", observe);
        alert("Password changed");
        this.logout();
      },
        error => {
          console.log(error.status);
          alert("Incorrect old password");
        });
    }
  }

  onEmailTyped(event: any) {
    this.emailTyped = event.target.value;
  }

  deleteAccount() {
    if (this.emailTyped !== this.user!.email) {
      alert("Incorrect email");
      return;
    }
    this.userService.deleteUser(this.user?.id!).subscribe(res => {
      console.log("res", res);
      this.logout();

    });
  }

  changeStatus(){
    this.userService.userHoliday(this.user?.id!).subscribe(res =>{
      console.log("res",res);
      console.log("updated");
      this.userService.me().subscribe(updatedUser => {
        this.user = updatedUser;
      });
      
    })
  }

  refreshPage() {
    this.route.navigateByUrl('/account-settings', { skipLocationChange: true }).then(() => {
      this.route.navigate([this.route.url]);
    });
  }

  changeEmail() {
    console.log("new email: ", this.newEmail);
    const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(this.newEmail!)) {
      alert("Incorrect email inserted");
      return;
    }

    this.user!["email"] = this.newEmail;
    console.log("email: ", this.user?.email);

    this.updateUser("Email");
  }


  changeUsername() {
    console.log("new username: ", this.newUsername);

    if (!this.newUsername) {
      alert("You must insert a new username");
      return;
    }
    this.user!.username = this.newUsername;
    console.log("username: ", this.user?.username);

    this.updateUser("Username");
  }

  updateUser(str: string) {
    let observe;
    this.userService.updateUser(this.user!, this.user?.id!, observe).subscribe({
      next: (observe: UserDTO) => {
        console.log("res: ", observe);
        alert(str + " changed");
        this.logout();
      },
      error: (error: any) => {
        console.log(error.status);
        alert(str + " already used");
      }
    });
  }

  logout() {
    this.apiAuth.logout();
    this.route.navigate(['/login']);
  }

  save() {
    console.log('Saving...');
    this.currentUserService.updateUser(this.user as UserDTO);
  }

}


