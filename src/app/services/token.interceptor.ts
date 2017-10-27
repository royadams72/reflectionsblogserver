import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const id_token = localStorage.getItem("id_token");

    if (id_token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${id_token}`
        }
      });
      console.log(req)
      return next.handle(req);

    }
  }
}
