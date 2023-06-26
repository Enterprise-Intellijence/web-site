import { Component } from '@angular/core';
import { GoogleApiAuthService } from './services/google-api-auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'enterprise-intellijence';

  // TODO: remove
  constructor(private tmp: GoogleApiAuthService) {

    gapi.load('auth2', () => {
      gapi.client.init({
        clientId: '1049827257011-ete5d6u7kjq601i6ra2ukaus5nsd3het.apps.googleusercontent.com',
      }).then(() => {
        console.log('auth2 init');
      });
    });
  }
}
