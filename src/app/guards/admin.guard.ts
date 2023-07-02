import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiAuthService } from '../services/api-auth.service';
import { CurrentUserService } from '../services/current-user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: ApiAuthService,
    private currentUserService: CurrentUserService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(`AdminGuard.canActivate(): this.authService.isLoggedIn():`, this.authService.isLoggedIn());
    console.log(`AdminGuard.canActivate(): this.authService.isAdmin:`, this.authService.isAdmin);

    if(this.authService.isLoggedIn() && this.authService.isAdmin) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}

