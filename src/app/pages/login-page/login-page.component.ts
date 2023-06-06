import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiAuthService } from 'src/app/services/api-auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  public username: string = 'username1';
  public password: string = 'password1';


  constructor(private auth: ApiAuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.auth.login(this.username, this.password).subscribe(res => {
      console.log(`res:`, res);
    });
  }

  setUsername($event: string) {
    this.username = $event;
  }

  setPassword($event: string) {
    this.password = $event;
  }


}
