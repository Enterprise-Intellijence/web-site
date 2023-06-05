import { Component } from '@angular/core';
import { ApiAuthService } from 'src/app/services/api-auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  public email: string = '';
  public password: string = '';


  constructor(private auth: ApiAuthService) { }

  onSubmit(event: any) {
    this.auth.login(this.email, this.password).subscribe(res => {
      console.log(`res: ${JSON.stringify(res)}`);
    }
    );
  }
}
