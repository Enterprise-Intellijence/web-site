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
      .pipe(tap(res => this.setJWT(res)));
  }

  private setJWT(encodedJwt: any) {

      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + encodedJwt.expiresIn);

      localStorage.setItem('id_token', encodedJwt.idToken);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }






}