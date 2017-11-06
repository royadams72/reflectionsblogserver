import { Injectable, EventEmitter } from '@angular/core';
import { Error } from './error.model';
@Injectable()
export class ErrorService {
  errorOcurred = new EventEmitter<Error>();

  constructor() { }

  handleError(error: any) {
    const errorData = new Error(error.title, error.message);
    this.errorOcurred.emit(errorData);
  }

}
