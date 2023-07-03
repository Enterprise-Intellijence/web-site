import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiAuthService } from '../services/api-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth: ApiAuthService, public router: Router) { }

  canActivate(): boolean {
    console.log(`AuthGuard.canActivate(): this.auth.isLoggedIn():`, this.auth.isLoggedIn());

    if (this.auth.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}
