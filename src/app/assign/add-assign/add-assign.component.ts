import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs-compat';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BackendserviceService } from 'src/app/backendservice.service';
@Component({
  selector: 'app-add-assign',
  templateUrl: './add-assign.component.html',
  styleUrls: ['./add-assign.component.css']
})
export class AddAssignComponent implements OnInit {
  assignForm: FormGroup
  deviceid:Array<any>[];
  admin:any[];
  constructor(
    public service : BackendserviceService,
    private router: Router,
   
    private fb: FormBuilder
  ) {
    this.assignForm = this.fb.group({
      deviceId: '',
      
      assignedToAdmin: '',

     

    })
   }

   ngOnInit() {
   
    Observable.forkJoin([
      this.service.admins(),
      
      this.service.notmap(),
    
    
      ]).subscribe(
        result=>{
          console.log(result)
          this.admin=result[0].data
//           this.arr=this.deviceid
       
// console.log(this.arr)
      console.log(result[1].data)
          this.deviceid=result[1].data
         
  
        }

      )
    
    
  }
  onSubmit() {
  
    // this.service.assign(this.assignForm.value).subscribe(
      this.service.assign({deviceId:this.assignForm.value.deviceId,assignedToAdmin:this.assignForm.value.assignedToAdmin}).subscribe(
      result => {
        console.log(this.assignForm.value)
        console.log(result)
        alert(result['message']);
       
         var x;
         x=confirm("Are You Sure You Want To Navigate To View Page")
         if(x==true){
          this.router.navigate(['/dashboard/view-assign']);}
         else{
           this.assignForm.reset()
         }
        
        
      },
      err => {


      }
    )
  }
}

