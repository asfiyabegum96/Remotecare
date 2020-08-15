
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs-compat';
import { BackendserviceService } from 'src/app/backendservice.service';

@Component({
  selector: 'app-update-org',
  templateUrl: './update-org.component.html',
  styleUrls: ['./update-org.component.css']
})
export class UpdateOrgComponent implements OnInit {
  randomNumber; //Line 1 added
  selectedFile: File = null;
  code: any[];
  level: string[] = ['Midwife', 'Community health worker', 'Healthcare volunteer', 'PHC doctors', 'CDMO DHQ', 'CSMO SHQ'];
  updateservice: FormGroup;
  hierarchyLevels: string[] = ['Global', 'Country', 'State', 'District', 'City', 'Zipcode', 'Village'];
  selectedLevels: any = [];
  constructor(
    private route: ActivatedRoute,
    private service: BackendserviceService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.updateservice = this.fb.group({
      _id: '',
      OrganizationId: '',
      OrganizationName: '',
      address1: '',
      address2: '',
      state: '',
      district: '',
      pin: '',
      file: '',
      hierarchyLevels: ''
    })

  }

  uploadFile(file) {
    console.log(file)
    const formData = new FormData();
    formData.append('file', file.data);
  }
  ngOnInit() {
    this.service.getserviceid(this.route.snapshot.params['id']).subscribe
      (
        result => {
          console.log(result)
          this.updateservice.patchValue({
            _id: result.data[0]._id,
            OrganizationId: result.data[0].OrganizationId,
            OrganizationName: result.data[0].OrganizationName,
            address1: result.data[0].address1,
            address2: result.data[0].address2,
            state: result.data[0].state,
            district: result.data[0].district,
            pin: result.data[0].pin,
            hierarchyLevels: result.data[0].hierarchyLevels[0],
            file: result.data[0].file
          })
            , error => {

            }

        }
      )
  }
  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile && this.selectedFile.name) {
      this.randomNumber = Math.floor(Math.random() * 90000) + 10000; //Line 2 added
      let formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      for (let key in this.updateservice.value) {
        if (key === 'hierarchyLevels') {
          this.updateservice.value[key] = this.selectedLevels;
        } else if (key === 'file') {
          this.updateservice.value[key] = this.selectedFile.name;
        }
      }
      formData.append("logoName", this.randomNumber); // Line 3 added
      this.service.updateservice(this.updateservice.value).subscribe(
        result => {
          console.log(result)
          console.log(this.updateservice.value)
          alert(result['message']);

          var x;
          x = confirm("Are You Sure You Want To Navigate To View Page")
          if (x == true) {
            this.router.navigate(['/dashboard/view-org']);
          }


        },
        result => {
          console.log(result);
        }
      )
    } else {
      alert('Please upload an image')
    }
  }
  hierarchySelect() {
    const selectedValue = this.updateservice.value.hierarchyLevels;
    this[selectedValue] = true;
    this.selectedLevels.push(selectedValue);
    this.hierarchyLevels = this.hierarchyLevels.filter((data) => data !== selectedValue);
  }



}