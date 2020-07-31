import { Component,OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { BackendserviceService } from '../backendservice.service';
@Component ({
   selector: 'my-app',
   encapsulation: ViewEncapsulation.None,
   templateUrl: './login.component.html',
  //  styleUrls: ['/login.component.css']
})
export class LoginComponent  {
    userDetails = {userId:"",password:""}
    constructor(
        private router: Router,
        private service:BackendserviceService
    ) {
    }

    login() {
        // this.router.navigateByUrl('dashboard/home');
        console.log(this.userDetails)
       
        this.service.login(this.userDetails).subscribe(
          result => {
            console.log(result)
          if(result.success===false){
            alert(result['message'])
          }
            console.log(result.data.userType)
            if(result.data.userType==="ServiceProvider"||result.data.userType==="patient"){
               alert('login using mobile app') 
            }
    
           else if(result.success){
              localStorage.setItem('token',result.token);
              localStorage.setItem('userInfo',JSON.stringify(result.data));
              this.router.navigate(['dashboard/home']);
            }
            else{
              alert(result.message);
            }
           
           
          },
          error=>{
            console.log(error);
            alert('internal error occured')
          })
        }
      
    
    }
