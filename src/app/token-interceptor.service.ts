import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'
import { BackendserviceService } from './backendservice.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private service:BackendserviceService
  ) { }
  intercept(req, next) {
    let authService = this.service.getToken();
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService}`
      }
    })
    return next.handle(tokenizedReq);
  }

}
