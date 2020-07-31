import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as $ from 'jquery';
import { BackendserviceService } from '../backendservice.service';
// import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-header-component',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    public pageName = 'Job';
    constructor(public router: Router,
        private service:BackendserviceService
        ) {
    }
   ngOnInit(){
   
   }
  
    public user() {
        var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    
        if (userInfo.userType === "admin") {
          return true
        } else {
          return false;
        };
      }
      public showuser() {
        var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    
        if (userInfo.userType === "superadmin") {
          return true
        } else {
          return false;
        };
      }
      public smart() {
        var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    
        if (userInfo.userType === "smartxengineer") {
          return true
        } else {
          return false;
        };
      }
    redirectToAbout() {
        this.router.navigateByUrl('dashboard/about');
    }
    logMeOut(){
        // this.router.navigateByUrl('login');
        var x;
        x = confirm("Are You Sure You Want To Logout")
        if (x == true) {
          localStorage.clear();
          this.router.navigateByUrl('login');
        }
    }

}
