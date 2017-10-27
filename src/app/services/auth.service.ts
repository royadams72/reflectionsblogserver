import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/map';

import * as moment from 'moment';

@Injectable()
export class AuthService {
  blogsURL: string;
  constructor(private http: HttpClient) {
    // this.blogsURL = 'https://reflections-blog.herokuapp.com/'
    this.blogsURL = 'http://localhost:3000/'
  }

  public login(email, password) {
    // console.log(blog._id)
    return this.http.post(this.blogsURL + 'login', { email, password })
      //  .toPromise()
      .do((res: Response) => {
        if (res) {
          this.setSession(res)
        }
      }).shareReplay();/*shareReplay to prevent the receiver of this Observable
                      from accidentally triggering multiple POST requests*/
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  public logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  public getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
