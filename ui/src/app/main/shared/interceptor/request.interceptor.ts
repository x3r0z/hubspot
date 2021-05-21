import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { map } from 'rxjs/operators';
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private readonly _authService: AuthService
  ){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken: string | null = this._authService.getItem('accessToken');
    if (accessToken) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + accessToken) });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          return event;
      }));
  }
}
