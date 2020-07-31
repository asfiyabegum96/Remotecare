import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { query } from '@angular/animations'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BackendserviceService } from 'src/app/backendservice.service';
import { Observable } from 'rxjs-compat';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  type: string[] = ['smartxengineer','admin'];
  multipleuser:string[]=['ServiceProvider']
  gend:string[]=['Male','Female','Do Not Want To Mention']
  code:any[];
  updateform:FormGroup;
  user:Boolean;
  sp:Boolean;
  userType;
  submitted=false;
 isactive=[
   
    {id:true},{id:false}];
 selected="true"
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private fb:FormBuilder,
    private service:BackendserviceService
  ) { 
    this.updateform=this.fb.group({
      userId:[''], 
     _id:'',
    
      userType:'',
      userName:'',
      gender:'',
      age:['',Validators.compose([Validators.required,Validators.min(1),Validators.max(99)])],
     
      address:'',
      address2:'',
      location:'',
      emailId:'',
      mobileNumber:['',Validators.compose([Validators.required,Validators.maxLength(10),Validators.minLength(10)])],
     
      extraRole:'',
      isActive:'',
    
   })
  }
  get f() { return this.updateform.controls; }
  public localStorageItem(): boolean {
    console.log(localStorage.getItem("userInfo"))
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    console.log(userInfo)
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
  ngOnInit(): void {
    this.user = this.localStorageItem();
    Observable.forkJoin([
     
      this.service.get(this.route.snapshot.params['id']),
    this.service.getservice(),
      ]).subscribe(
        result=>{
          console.log(result);
          this.code=result[1].data
          console.log(this.code)
          this.updateform.patchValue({
          _id:result[0].data[0]._id,
                    userId:result[0].data[0].userId,
                    // password:result.data[0].password,
                    userType:result[0].data[0].userType,
                    userName:result[0].data[0].userName,
                    gender:result[0].data[0].gender,
                    age:result[0].data[0].age,
                    mobileNumber:result[0].data[0].mobileNumber,
                    address:result[0].data[0].address,
                    address2:result[0].data[0].address2,
                    serviceAreaCode:result[0].data[0].serviceAreaCode,
                    emailId:result[0].data[0].emailId,
                    extraRole:result[0].data[0].extraRole,
                    location:result[0].data[0].location,
                     isActive:result[0].data[0].isActive,})
                   
        }
      ),error=>{

      }
 
  }
  onSubmit(){
    this.updateform.value.userId = this.updateform.value.emailId;
 
    this.service.updateuser(this.updateform.value).subscribe(
      result => {
        
console.log(this.updateform.value)
        console.log(result)
        alert( result['message']);
        
         this.router.navigate(['dashboard/view-user']);
         var x;
         x=confirm("Are You Sure You Want To Navigate To View Page")
         if(x==true){
         this.router.navigate(['/dashboard/view-user']);}
         else{
           
         }

      },
      result => {
        console.log(result);
      }
    )
  }

}
