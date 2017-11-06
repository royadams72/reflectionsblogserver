import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as jwt_decode from 'jwt-decode';

import { AlertService } from '../components/alert/alert.service';
import { ENV } from '../app.config';

@Injectable()
export class AuthService {

  private blogsURL: string;
  private adminId: string;
  private username: string;
  private userState: any;

  constructor(private http: HttpClient,
    private router: Router,
    private alertService: AlertService) {
    this.blogsURL = ENV.BASE_API;
    this.userState = new BehaviorSubject<Boolean>(false);//init BehaviorSubject
  }

  public login(email, password) {
    return this.http.post(this.blogsURL + 'login', { email, password })
      .do((res: Response) => {
        if (res) {
          this.setSession(res)
        }
      }).shareReplay();//shareReplay to prevent the receiver of this Observable
  }  //from accidentally triggering multiple POST requests

  private setSession(authResult) {
    const decoded = jwt_decode(authResult.token)
    let exp = decoded.exp;
    this.username = decoded.name;
    this.adminId = decoded.sub;
    console.log(exp)
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", exp);
    this.userState.next(true)
    this.router.navigate(['/crudblog'])
  }

  public logout() {
    this.userState.next(false);
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }


  get isLoggedIn() {
    var current_time = new Date().getTime() / 1000;
    console.log(current_time)
    if (current_time <= this.getExpiration()) {
      this.userState.next(true);
    }
    return this.userState;
  }

  private getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return expiresAt;
  }


}
