import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

import * as crypto from 'crypto-js';
import * as jwt_decode from 'jwt-decode';

// import { randomPassword } from '../utils/random-pass'
import { ENV } from '../app.config'
@Injectable()
export class AuthService {
  blogsURL: string;
  secret: string;
  adminId: string;
  username: string;
  constructor(private http: HttpClient) {
    this.blogsURL = ENV.BASE_API;
  }

  public login(email, password) {
    return this.http.post(this.blogsURL + 'login', { email, password })
      .do((res: Response) => {
        if (res) {
          this.setSession(res)
        }
      }).shareReplay();/*shareReplay to prevent the receiver of this Observable
                      from accidentally triggering multiple POST requests*/
  }

  private setSession(authResult) {
    const decoded = jwt_decode(authResult.token)
    this.username = decoded.name;
    this.adminId = decoded.sub;
    let exp = decoded.exp;
    console.log(exp)
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", exp);
  }

  public logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    var current_time = new Date().getTime() / 1000;
    console.log(current_time)
    return current_time <= this.getExpiration()
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  public getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return expiresAt;
  }


}
