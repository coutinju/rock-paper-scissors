import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { ExternalCommunicationService } from '../external/external-communication.service';
import { LoadingService } from '../internal/loading.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpRestInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(ExternalCommunicationService.SERVER_URL)) {
      return next.handle(req);
    }

    const loadingService: LoadingService = this.loadingService;
    let timeout = setTimeout(() => {
      loadingService.setDisplayWaiting(true);
    }, 1000);

    const httpEvent: Observable<HttpEvent<any>> = next.handle(req)
      .pipe(tap(
        event => {
          clearTimeout(timeout);
          loadingService.setDisplayWaiting(false);
        },
        error => {
          clearTimeout(timeout);
          loadingService.setDisplayBug(true);
          setTimeout(() => {
            loadingService.setDisplayBug(false);
          }, 3000);
        }
      ));
    
    return httpEvent;
  }
}