import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable()
export class IsloggedinGuard implements CanActivate {
  isLoggedIn: Boolean
  constructor(private authService: AuthService) { }
  canActivate() {
    this.authService.isLoggedIn
      .subscribe((data) => {
        console.log(data);
        this.isLoggedIn = data;
      })
    if (this.isLoggedIn) {
      return true;
    } else {
      window.alert("You don't have permission to view this page");
      return false;
    }
  }
}
