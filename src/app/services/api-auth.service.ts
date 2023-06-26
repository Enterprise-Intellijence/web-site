import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { UserControllerService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {


  public isLoggedIn$: BehaviorSubject<boolean>;


  private _encodedAccessJWT: string | null = null;
  public get encodedAccessJWT() { return this._encodedAccessJWT; }
  private set encodedAccessJWT(value) { this._encodedAccessJWT = value; }

  private _encodedRefreshJWT: string | null = null;
  public get encodedRefreshJWT() { return this._encodedRefreshJWT; }
  private set encodedRefreshJWT(value) { this._encodedRefreshJWT = value; }

  private accessJWT: AccessJWT | null = null;
  private refreshJWT: RefreshJWT | null = null;


  constructor(private http: HttpClient,
    private userService: UserControllerService) {
    this.loadTokens();
    this.isLoggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn());
    console.log(`this.isLoggedIn():`, this.isLoggedIn());
  }

  public login(username: string, password: string) {
    return this.userService.authenticate(username, password)
      .pipe(tap(response => this.handleAuthenticateResponse(response)));
  }

  private handleAuthenticateResponse(response: any) {
    this.encodedAccessJWT = response.accessToken.replace('Bearer ', '');
    this.encodedRefreshJWT = response.refreshToken.replace('Bearer ', '');

    this.accessJWT = jwtDecode(this.encodedAccessJWT!);
    this.refreshJWT = jwtDecode(this.encodedRefreshJWT!);

    this.saveTokens();

    this.isLoggedIn$.next(true);
  }

  public register(username: string, email: string, password: string) {
    return this.userService.register(username, email, password);
  }


  saveTokens() {
    localStorage.setItem('accessJWT', this.encodedAccessJWT || '');
    localStorage.setItem('refreshJWT', this.encodedRefreshJWT || '');
  }

  loadTokens() {
    this.encodedAccessJWT = localStorage.getItem('accessJWT') || null;
    this.encodedRefreshJWT = localStorage.getItem('refreshJWT') || null;

    if (!this.encodedAccessJWT || !this.encodedRefreshJWT) {
      this.accessJWT = null;
      this.refreshJWT = null;
    }
    else {
      this.accessJWT = jwtDecode(this.encodedAccessJWT);
      this.refreshJWT = jwtDecode(this.encodedRefreshJWT);
    }
  }

  public logout() {
    this.encodedAccessJWT = null;
    this.encodedRefreshJWT = null;
    this.accessJWT = null;
    this.refreshJWT = null;
    this.saveTokens();
    this.isLoggedIn$.next(false);
    console.log('logged out', this.isLoggedIn());

  }

  public isLoggedIn(): boolean {
    return (this.accessJWT != null)
      && (this.refreshJWT != null)
      && this.notExpired(this.accessJWT)
      && this.notExpired(this.refreshJWT);
  }


  private notExpired(jwt: AccessJWT | RefreshJWT): boolean {
    return jwt.exp > (Date.now() / 1000);
  }

}

export type Response = {
  accessToken: string;
  refreshToken: string;
}

export type AccessJWT = {
  exp: number;
  iat: number;
  nbf: string;
  username: string;
  role: string;
}

export type RefreshJWT = {
  exp: number;
  iat: number;
  nbf: string;
  username: string;
}
