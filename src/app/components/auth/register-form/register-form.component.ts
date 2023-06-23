import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { NgForm } from '@angular/forms';
import { PasswordMatchValidatorDirective } from 'src/app/directives/forms/passwordMatch.directive';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  isWaitingForResponse: boolean = false;


  constructor(private auth: ApiAuthService, private router: Router) { }


  setUsername($event: string) {
    this.username = $event;
  }

  setEmail($event: string) {
    this.email = $event;
  }

  setPassword($event: string) {
    this.password = $event;
  }

  setConfirmPassword($event: any) {
    throw new Error('Method not implemented.');
  }

  onRegister() {
    this.isWaitingForResponse = true;

    this.auth.register(this.username, this.email, this.password).subscribe({
      next: (res) => {
        this.isWaitingForResponse = false;
        console.log('register result:', res);
        this.router.navigate(['/confirm-registration-email']);
      },
      error: (err) => {
        this.isWaitingForResponse = false;
        console.log('register error:', err);
      }
    });
  }

}
