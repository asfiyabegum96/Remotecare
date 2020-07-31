
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BackendserviceService } from 'src/app/backendservice.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  regForm: FormGroup
  type: string[] = ['wearable', 'handheld'];
  myDate = Date.now();
  constructor(
    private service: BackendserviceService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.regForm = this.fb.group({
      deviceId:['',Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(12)])],
      deviceType: '',
      deviceManufacturer: '',
      imeiNumber: '',
      deviceTestEngineer: '',
      dateOfFirstRelease: '',
      simNumber: '',
      

    })
   }
   get f() { return this.regForm.controls; }
  ngOnInit(): void {
  }
  onSubmit() {
  
    this.service.adddevice(this.regForm.value).subscribe(
      result => {
        console.log(this.regForm.value)
        console.log(result)
        alert(result['message']);
        
         var x;
         x=confirm("Are You Sure You Want To Navigate To View Page")
         if(x==true){
          this.router.navigate(['/view']);}
         else{
           this.regForm.reset()
         }
         
      },
      err => {


      }
    )
  }

}
