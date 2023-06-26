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


  // SCOPES: string = `https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

  // ngAfterViewInit() {
  //   this.googleInit()
  // }

  // googleInit() {
  //   let initClient = () => {


  //     gapi.auth2.init({
  //       client_id: "1049827257011-ete5d6u7kjq601i6ra2ukaus5nsd3het.apps.googleusercontent.com",
  //       cookie_policy: 'single_host_origin',
  //       redirect_uri: 'http://localhost:4200/login-with-google-redirect',
  //       scope: this.SCOPES
  //     }).then((auth2: any) => {

  //       auth2.attachClickHandler(
  //         document.getElementById('google-btn'),
  //         {},
  //         onSuccess,
  //         onFailure
  //       )
  //     })
  //   }

  //   let onSuccess = (googleUser: any) => {
  //     let profile = googleUser.getBasiProfile();
  //     console.log(profile);
  //     console.log(googleUser);
  //     console.log('Token: ' + googleUser.getAuthResponse().id_token);
  //     console.log('ID: ' + profile.getId());
  //     console.log('Name: ' + profile.getName());
  //     console.log('Image URL: ' + profile.getImageUrl());
  //     console.log('Email: ' + profile.getEmail());
  //     // Your code below this line to complete authentication
  //   }

  //   let onFailure = (err: any) => {
  //     console.log(err)
  //   }

  //   gapi.load('auth2', initClient)

  // }

}
