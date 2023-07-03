import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { GoogleApiAuthService } from 'src/app/services/google-api-auth.service';

declare global {
  const google: typeof import('google-one-tap');
}

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements AfterViewInit {

  buttonDisplayed: boolean = false;

  @ViewChild('googleBtnDiv') public googleBtnDiv!: ElementRef<HTMLElement>;



  constructor(private googleApiAuth: GoogleApiAuthService, private apiAuth: ApiAuthService) { }




  ngAfterViewInit(): void {
    this.googleApiAuth.isGoogleLibraryLoaded$.subscribe((isLoaded) => {
      this.displayGoogleButton();
    });

    this.apiAuth.isLoggedIn$.subscribe((isLoggedIn) => {
      this.displayGoogleButton();
    });

    this.displayGoogleButton();
  }

  displayGoogleButton() {
    if (this.googleApiAuth.isGoogleInitialized$.value
      && !this.buttonDisplayed && !this.apiAuth.isLoggedIn()) {

      console.log("google api loaded: ", this.googleApiAuth.isGoogleLibraryLoaded$.value);
      console.log("button displayed: ", this.buttonDisplayed);
      console.log("user logged in: ", this.apiAuth.isLoggedIn());

      this.buttonDisplayed = true;

      google.accounts.id.renderButton(
        this.googleBtnDiv.nativeElement,
        {
          theme: "outline",
          size: "large",
          text: 'continue_with',
          shape: "rectangular",
        }  // customization attributes
      );
    }
  }
}
