import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendserviceService } from './backendservice.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  private role:String
constructor(
  private router:Router,
  private service:BackendserviceService
){}
canActivate(route:ActivatedRouteSnapshot): boolean{
  if(this.service.isLoggedIn()){
  
    
    return true;
  }else{
    this.router.navigate(['/login']);
    return false;
  }
}
}
