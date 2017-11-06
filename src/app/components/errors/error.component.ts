import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Error } from './error.model';
import { ErrorService } from './error.service';
@Component({
  selector: 'app-error',
  templateUrl: 'error.component.html',
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
export class ErrorComponent implements OnInit {
  error: Error
  display = 'none'

  onErrorHandled() {
    //Called when close button on error modal
    this.display = 'none';
    this.router.navigate(['/'])
  }
  constructor(private errorService: ErrorService, private router: Router) { }

  ngOnInit() {
    //Subscribe/watch the EventEmitter set up in error.service
    //If emitted, do this
    this.errorService.errorOcurred.subscribe(
      (error: Error) => {
        this.error = error;
        this.display = 'block';
      }
    )

  }
}
