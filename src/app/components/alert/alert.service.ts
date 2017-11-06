import { Injectable, EventEmitter } from '@angular/core';
import { Alert } from './alert.model'
@Injectable()
export class AlertService {
  alertOccurred = new EventEmitter<Alert>();

  constructor() { }

  handleAlert(alert: any) {
    const alertData = new Alert(alert.title, alert.message, alert.action);
    this.alertOccurred.emit(alertData);
  }

}
