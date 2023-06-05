import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestConfiguration {
  private nextAuthHeader?: string;
  private nextAuthValue?: string;


  constructor() { }


  /** Set to basic authentication */
  public basic(user: string, password: string): void {
    this.nextAuthHeader = 'Authorization';
    this.nextAuthValue = 'Basic ' + window.btoa(user + ':' + password);
  }

  /** Set to session key */
  // session(sessionKey: string): void {
  //   this.nextAuthHeader = 'Session';
  //   this.nextAuthValue = sessionKey;
  // }

  /** Set to bearer token */
  public bearer(token: string): void {
    this.nextAuthHeader = 'Authorization';
    this.nextAuthValue = 'Bearer ' + token;
  }

  /** Clear any authentication headers (to be called after logout) */
  public clear(): void {
    this.nextAuthHeader = undefined;
    this.nextAuthValue = undefined;
  }

  /** Apply the current authorization headers to the given request */
  public apply(request: HttpRequest<any>): HttpRequest<any> {
    var headers = new HttpHeaders();
    if (this.nextAuthHeader && this.nextAuthValue) {
      headers.append(this.nextAuthHeader, this.nextAuthValue);
    }
    // Apply the headers to the request
    return request.clone({
      headers: headers
    });
  }
}
