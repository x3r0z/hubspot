import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private counter: number;
  constructor(private loadingService: LoadingService) {
      this.counter = 0;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.counter++;
      if (1 === this.counter) {
          this.loadingService.display(true);
      }
      return next.handle(request).pipe(
          finalize(() => {
              this.counter--;
              if (0 === this.counter) {
                  this.loadingService.display(false);
              }
          })
      );
  }
}
