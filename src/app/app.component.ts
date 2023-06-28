import { Component, OnInit } from '@angular/core';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService } from './services/api-auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'enterprise-intellijence';

  constructor(private ngZone: NgZone, private router: Router, private apiAuth: ApiAuthService) {}

  ngOnInit(): void {
    if(!this.apiAuth.isLoggedIn()){
      this.initializeGoogleAuth();
    }
    else{
      console.log("User is logged in, no need for google auth");
    }
  }


  private initializeGoogleAuth() {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      console.log('Google\'s One-tap sign in script loaded!');

      // @ts-ignore
      google.accounts.id.initialize({
        // Ref: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
        client_id: '1049827257011-ete5d6u7kjq601i6ra2ukaus5nsd3het.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: true,
        cancel_on_tap_outside: false
      });

      // OPTIONAL: In my case I want to redirect the user to an specific path.
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {
        console.log('Google prompt event triggered...');

        if (notification.getDismissedReason() === 'credential_returned') {
          this.ngZone.run(() => {
            this.router.navigate(['/'], { replaceUrl: true });
            console.log('Welcome back!');
          });
        }
      });
    };
  }

  handleCredentialResponse(response: CredentialResponse) {
    // Decoding  JWT token...
    this.ngZone.run(() => {
      this.apiAuth.googleLogin(response.credential).subscribe();
    });

    let decodedToken: any | null = null;
    try {
      decodedToken = JSON.parse(atob(response?.credential.split('.')[1]));
    } catch (e) {
      console.error('Error while trying to decode token', e);
    }
    console.log('decodedToken', decodedToken);
  }



}
