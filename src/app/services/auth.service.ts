import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as jwt_decode from 'jwt-decode';

import { AlertService } from '../components/alert/alert.service';
import { ENV } from '../app.config';
import { tokenNotExpired } from 'angular2-jwt';
import { AUTH_CONFIG } from '../config-files/auth0-variables';
// import Auth0Lock from 'auth0-lock'; // the fix
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  private blogsURL: string = ENV.BASE_API;;
  private adminId: string;
  private username: string;
  private userState: any;
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token id_token',
    audience: AUTH_CONFIG.AUDIENCE,
    redirectUri: AUTH_CONFIG.REDIRECT,
    scope: AUTH_CONFIG.SCOPE
  });
  constructor(private http: HttpClient,
    private router: Router,
    private alertService: AlertService) {

    if (this.authenticated) {
      this.setLoggedIn(true);
    }
    // this.blogsURL = ENV.BASE_API;
    // this.userState = new BehaviorSubject<Boolean>(false);//init BehaviorSubject


  }
  setLoggedIn(value: boolean) {
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }
  login() {
    this.auth0.authorize();
  }


  handleAuth() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      //Use accessToken to protect API and client side resources
      //Use idToken to get user info, used clienside only
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getProfile(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.error(`Error: ${err.error}`);
      }
    });
  }
  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile, name) => {
      console.log(name)
      this._setSession(authResult, profile);
    });
  }

  private _setSession(authResult, profile) {
    // Save session data and update login status subject
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.setLoggedIn(true);
  }

  logout() {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem('token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.router.navigate(['/']);
    this.setLoggedIn(false);
  }

  get authenticated() {
    // Check if there's an unexpired access token
    return tokenNotExpired('token');
  }

}
