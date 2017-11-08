import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    // console.log(token)
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + token)
      });
      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
