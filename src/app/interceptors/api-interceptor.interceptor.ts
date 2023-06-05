import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiRequestConfiguration } from '../services/api-request-configuration.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private apiRequestConfiguration: ApiRequestConfiguration) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Apply the headers
    request = request.clone({
      setHeaders: {
        'ApiToken': '1234567890'
      }
    });

    // Also handle errors globally
    return next.handle(request).pipe(
      tap({ error: error => {
        // Handle this err
        console.error(`Error performing request, status code: ${error.status}\nError message: ${error.message}`);
      }})
    );
  }
}
