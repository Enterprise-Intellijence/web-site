import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiAuthService } from '../services/api-auth.service';
import { Config } from '../models/config';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private apiAuth: ApiAuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Apply the headers
    if (!request.url.startsWith(Config.basePath)) {
      return next.handle(request);
    }

    if (this.apiAuth.isLoggedIn()) {
      request = this.addAuthHeader(request);
    }

    // Also handle errors globally
    return next.handle(request).pipe(
      tap({
        error: error => {
          // Handle this err
          if(error.status == 401) {
            this.apiAuth.logout();
          }
          else if(error.status == 404) {
            console.warn(`404 error, url: ${error.url}`);
          }
          else if(error.status == 500) {
            console.error(`500 Server error, url: ${error.url}`);
          }
          else {
            console.error(`error ${error.status} status code, url: ${error.url}\n${error.message}\n${error.error.error}`, error);
          }
        }
      })
    );
  }

  addAuthHeader(request: HttpRequest<unknown>): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.apiAuth.encodedAccessJWT}`,
      },
      withCredentials: true
    });
  }
}
