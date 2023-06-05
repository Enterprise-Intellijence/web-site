import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRequestConfiguration } from './api-request-configuration.service';
import { tap } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { UserControllerService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {



  constructor(private http: HttpClient,
    private apiRequestConfiguration: ApiRequestConfiguration,
    private userService: UserControllerService) {
  }

  public login(username: string, password: string) {
    return this.userService.authenticate(username, password, 'response')
      .pipe(tap(response => this.setJWT(response)));
  }

  private setJWT(response: any) {
    // get token from header 'Authorization'
    console.log(`response: `, response);
    const encodedJwt = response.headers.get('Authorization').replace('Bearer ', '');

    console.log(`encodedJwt: ${encodedJwt}`);

    const jwt = jwtDecode(encodedJwt);
    console.log(`jwt: ${JSON.stringify(jwt)}`);

    // const expiresAt = new Date();
    // expiresAt.setSeconds(expiresAt.getSeconds() + jwt.expiresIn);

    // localStorage.setItem('id_token', jwt.idToken);
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }






}
