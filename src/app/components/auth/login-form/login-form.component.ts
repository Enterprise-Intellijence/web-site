import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { ApiAuthService } from 'src/app/services/api-auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {


  public username: string = 'username1';
  public password: string = 'password1';

  public isWaitingForResponse: boolean = false;

  constructor(private auth: ApiAuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onLogin() {
    this.isWaitingForResponse = true;
    this.auth.login(this.username, this.password).subscribe({
      next: res => {
        this.isWaitingForResponse = false;
        console.log('login result:', res);
        this.router.navigate(['/']);
      },
      error: e => {
        this.isWaitingForResponse = false;
        alert('Login failed');
        console.error('login error:', e);
      }
    });
  }

  setUsername($event: string) {
    this.username = $event;
  }

  setPassword($event: string) {
    this.password = $event;
  }

}
