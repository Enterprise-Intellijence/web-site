import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiAuthService } from 'src/app/services/api-auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {


  public username: string = '';
  public password: string = '';


  constructor(private auth: ApiAuthService) { }

  onSubmit() {
    this.auth.login(this.username, this.password).subscribe(res => {
      console.log(`res:`, res);
    });
  }

  setUsername($event: any) {
    this.username = $event;
  }

  setPassword($event: any) {
    this.password = $event;
  }


}
