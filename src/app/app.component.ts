import { Component, OnInit } from '@angular/core';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService } from './services/api-auth.service';
import { GoogleApiAuthService } from './services/google-api-auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'enterprise-intellijence';



  constructor(private ngZone: NgZone, private router: Router, private apiAuth: ApiAuthService, private googleApiAuth: GoogleApiAuthService) { }

  ngOnInit(): void {
    this.apiAuth.isLoggedIn$.subscribe((isLoggedIn) => {
      if (!isLoggedIn && this.googleApiAuth.isGoogleLibraryLoaded$.value) {
        this.googleApiAuth.prompt();
      }
    });

    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      console.log('Google\'s One-tap sign in script loaded!');
      this.googleApiAuth.isGoogleLibraryLoaded$.next(true);
      this.googleApiAuth.initialize();

      if(!this.apiAuth.isLoggedIn()) {
        this.googleApiAuth.prompt();
      }
    };
  }
}
