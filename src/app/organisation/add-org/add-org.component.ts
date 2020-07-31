import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

import { Router } from '@angular/router';
import { BackendserviceService } from 'src/app/backendservice.service';
declare var $: any;
@Component({
  selector: 'app-add-org',
  templateUrl: './add-org.component.html',
  styleUrls: ['./add-org.component.css']
})
export class AddOrgComponent implements OnInit {
  selectedFile:File=null;
  randomNumber; //Line 1 added
  code:any[];
  level: string[] = ['Midwife', 'Community health worker','Healthcare volunteer','PHC doctors','CDMO DHQ','CSMO SHQ'];
  serviceform:FormGroup
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private service:BackendserviceService,
  ) {
    this.serviceform=this.fb.group({
      OrganizationId:'',
      OrganizationName:'',
      address1:'',
      address2:'',
      state:'',
      district:'',
      pin:'',
      file:'',
    })
   }
   uploadFile(file) {
    console.log(file)
    const formData = new FormData();
    formData.append('file', file.data);
  }

  ngOnInit(): void {
  }
  onFileSelected(event){
   
    $("#file").change(
      function(){
      $("#file-name").text(this.files[0].name);
     
     });
    // console.log(event);
    // this.selectedFile= <File>event.target.files[0];
  }

  onSubmit(){
   
    this.randomNumber = Math.floor(Math.random() * 90000) + 10000; //Line 2 added
    let formData = new FormData();
    formData.append('file',this.selectedFile,this.selectedFile.name);
    for(let key in this.serviceform.value){
      formData.append(key,this.serviceform.value[key]);
    }
    formData.append("logoName", this.randomNumber); // Line 3 added
    this.service.addservice(formData).subscribe(
      result => {
        console.log(result)
        console.log(this.serviceform.value)
        alert( result['message']);
       
         var x;
         x=confirm("Are You Sure You Want To Navigate To View Page")
         if(x==true){
          this.router.navigate(['/view-service']);}
         else{
           this.serviceform.reset()
         }
         
      },
      result => {
        console.log(result);
      }
    )
  }

    
  

}
