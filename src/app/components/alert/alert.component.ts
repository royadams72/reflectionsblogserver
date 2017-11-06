import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from './alert.model';
import { AlertService } from './alert.service';
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [`
      .backdrop{
        background-color: rgba(0,0,0,0.6);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh
      }
      .modal-header{
        text-align:center!important;
        display:block;
      }
      .modal-body{
        display: block;
        text-align: center;
      }
    `]
})
export class AlertComponent implements OnInit {

  alert: Alert
  display = 'none'

  onAlertHandled(bool) {
    if (this.alert.action == 'logout' && bool) {
      this.authService.logout();
      this.router.navigate(['/']);
      this.display = 'none';
    } else {
      this.display = 'none';
    }
  }
  constructor(private alertService: AlertService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    //Subscribe/watch the EventEmitter set up in alert.service
    //If emitted, do this
    this.alertService.alertOccurred.subscribe(
      (alert: Alert) => {
        this.alert = alert;
        this.display = 'block';
      }
    )

  }

}
