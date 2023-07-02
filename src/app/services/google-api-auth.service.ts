import { Injectable, NgZone } from '@angular/core';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiAuthService } from './api-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GoogleApiAuthService {


  isGoogleLibraryLoaded$ = new BehaviorSubject<boolean>(false);
  isGoogleInitialized$ = new BehaviorSubject<boolean>(false);



  constructor(
    private apiAuth: ApiAuthService,
    private ngZone: NgZone,
    private router: Router,
  ) { }


  public initialize() {
    // @ts-ignore
    console.log('Initializing Google\'s One-tap sign in script...');

    google.accounts.id.initialize({
      // Ref: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
      client_id: '1049827257011-ete5d6u7kjq601i6ra2ukaus5nsd3het.apps.googleusercontent.com',
      callback: (credential) => { this.responseCallback(credential) },
      auto_select: true,
      cancel_on_tap_outside: false,
      log_level: 'warn',
    });

    this.isGoogleInitialized$.next(true);
  }


  responseCallback(response: CredentialResponse) {
    console.log('initializeCallback', response);

    this.ngZone.run(() => {
      this.apiAuth.googleLogin(response.credential).subscribe(
        (data) => {
          console.log('Google login successful!', data);
          this.router.navigate(['/'], { replaceUrl: true });
        }
      );
    });

    // Decoding  JWT token...
    let decodedToken: any | null = null;
    try {
      decodedToken = JSON.parse(atob(response?.credential.split('.')[1]));
      console.log('decodedToken', decodedToken);
    } catch (e) {
      console.error('Error while trying to decode token', e);
    }
  }


  prompt() {

    google.accounts.id.prompt((notification: PromptMomentNotification) => {
      console.log('Google prompt event triggered...');

      // // OPTIONAL: In my case I want to redirect the user to an specific path.
      // if (notification.getDismissedReason() === 'credential_returned') {
      //   this.ngZone.run(() => {
      //     this.router.navigate(['/'], { replaceUrl: true });
      //     console.log('Welcome back!');
      //   });
      // }

    });
  }
}
