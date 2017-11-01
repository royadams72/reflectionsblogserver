import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable()
export class IsloggedinGuard implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      window.alert("You don't have permission to view this page");
      return false;
    }
  }
}
