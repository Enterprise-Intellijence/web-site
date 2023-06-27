import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiAuthService } from 'src/app/services/api-auth.service';

declare const gapi: any;

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor() { }

}
