import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRequestConfiguration } from './api-request-configuration.service';
import { UserControllerService } from './api-service/userController.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {



  constructor(private http: HttpClient,
    private apiRequestConfiguration: ApiRequestConfiguration,
    private userService: UserControllerService){
  }

  public login(email:string, password:string) {
    return this.userService.authenticate(email, password)
      .pipe(tap(res => this.setSession(res)));
  }

  private setSession(authResult: any) {

      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + authResult.expiresIn);

      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    const expirationDate = this.getExpiration();
    if(!expirationDate)
      return false;

      return Date.now() <= expirationDate;
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration(): Date | null {
      // unix timestamp in seconds
      const expiration = localStorage.getItem("expires_at");
      if(!expiration)
        return null;

      const expiresAt = JSON.parse(expiration);

      return ;
  }
}
