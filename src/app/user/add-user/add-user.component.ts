
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { query } from '@angular/animations';
import { Router } from '@angular/router';
import { BackendserviceService } from 'src/app/backendservice.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  type: string[] = [ 'smartxengineer', 'admin'];
  multipleuser: string[] = ['ServiceProvider']
  gend: string[] = ['Male', 'Female', 'Do Not Want To Mention']
  code: any[];
  Userform: FormGroup;
  user: Boolean;
  sp: Boolean;
  userType;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service:BackendserviceService
  ) { 
    this.Userform = this.fb.group({
      userId: [''],
      password: '',
      userType: '',
      userName: '',
      gender: '',
      age: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(99)])],
      address: '',
      emailId: '',
      mobileNumber: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
    address2:'',
    location:'',
      extraRole: '',
    
    })
  }
  get f() { return this.Userform.controls; }
  public localStorageItem(): boolean {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if (userInfo.userType === "superadmin") {
      return true
    } else {
      return false;
    };
  }

  public show(): boolean {
    console.log(localStorage.getItem("userInfo"))
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    console.log(userInfo)
    if (userInfo.userType === "admin") {

      return true
    } else {
      return false;
    };
  }
  ngOnInit() {
    this.user = this.localStorageItem();
  }
  onSubmit() {
    this.Userform.value.userId = this.Userform.value.emailId;
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    console.log(userInfo.userType)
    if (userInfo.userType === "admin") {
      this.Userform.value.userType = "ServiceProvider"
    }
    this.service.adduser(this.Userform.value).subscribe(
      result => {
        console.log(result)
        console.log(result)
        alert(result['message']);
        var x;
        x = confirm("Are You Sure You Want To Navigate To View Page")
        if (x == true) {
          this.router.navigate(['/view-user']);
        }
        else {
          this.Userform.reset()
        }

      },
      result => {
        console.log(result);
      }
    )
  }


}
