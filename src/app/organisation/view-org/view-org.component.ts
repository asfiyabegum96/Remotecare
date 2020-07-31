
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BackendserviceService } from 'src/app/backendservice.service';



@Component({
  selector: 'app-view-org',
  templateUrl: './view-org.component.html',
  styleUrls: ['./view-org.component.css']
})
export class ViewOrgComponent implements OnInit {
  userType:Boolean;
  displayedColumns: string[] = ['OrganizationId', 'OrganizationName', 'address1', 'address2','district','state','pin','delete','edit'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private service :BackendserviceService
  ) { }

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
  ngOnInit() {
  
    this.userType = this.localStorageItem();
    this.service.getservice().subscribe((result)=>{
      console.log(result);
      this.dataSource = new MatTableDataSource(result.data?result.data:[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
    },(error)=>{
      console.log(error);
    })
    
  }
  delete(_id){
    this.service.deleteservice(_id).subscribe(
      result=>{
        console.log(result)
        alert( result['message']);
      }
    
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

}
}
