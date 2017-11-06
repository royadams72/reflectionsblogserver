import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../alert/alert.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  constructor(private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  public confirmLogout() {
    let alert = { title: "Do you want to loggout?", message: "If you don't wish to sign out, close this box", action: 'logout' }
    this.alertService.handleAlert(alert)
  }

}
