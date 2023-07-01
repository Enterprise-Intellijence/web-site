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
          console.error(`Error performing request, status code: ${error.status}\nError message: ${error.message}`, error);
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
