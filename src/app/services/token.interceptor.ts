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
    const idToken = localStorage.getItem("id_token");
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + idToken)
      });
      // console.log(cloned.headers.get("Authorization"))
      return next.handle(cloned);
    }
    else {
      return next.handle(req).do((event: any) => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now();
          console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      }).catch(error => {

        return Observable.throw(error);
      })
    }
  }
}
