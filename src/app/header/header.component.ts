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
export class HeaderComponent {
  public pageName = 'Job';
  constructor(public router: Router,
    private service: BackendserviceService
  ) {
  }
  ngOnInit() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if (userInfo.userType === 'admin') {
      this.service.getservice().subscribe((result) => {
        this.findAdminOrganization(result.data, userInfo)
      }, (error) => {
        console.log(error);
      })
    }
  }

  findAdminOrganization(response: Array<any>, userInfo) {
    if (response.length) {
      response.forEach(element => {
        if (element.OrganizationId === userInfo.organization) {
          this.getImageFromService(element.fileName)
        }
      });
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.service.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService(imageUrl: string) {
    this.service.isImageLoading = true;
    this.service.getImage(imageUrl).subscribe(data => {
      this.createImageFromBlob(data);
      this.service.isImageLoading = false;
    }, error => {
      this.service.isImageLoading = false;
      console.log(error);
    });
  }

  public user() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    this.service.logo = userInfo.fileName;
    this.service.userName = userInfo.userName;
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
  logMeOut() {
    // this.router.navigateByUrl('login');
    var x;
    x = confirm("Are You Sure You Want To Logout")
    if (x == true) {
      localStorage.clear();
      this.service.imageToShow = '';
      this.service.isImageLoading = true;
      this.service.userName = ''
      this.router.navigateByUrl('login');
    }
  }

}
