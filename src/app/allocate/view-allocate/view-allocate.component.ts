
import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router'
import { DataSource } from '@angular/cdk/table';
import { BackendserviceService } from 'src/app/backendservice.service';


@Component({
  selector: 'app-view-allocate',
  templateUrl: './view-allocate.component.html',
  styleUrls: ['./view-allocate.component.css']
})
export class ViewAllocateComponent implements OnInit {
  userid:String
  userType:Boolean
  type:String
  displayedColumns: string[] = ['deviceId', 'serviceProviderId'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private service : BackendserviceService,
  ) { }

  readLocalStorageValue() {
       
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    return userInfo;
  }
  public localStorageItem(): boolean {
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
 
 this.userType = this.localStorageItem();
 this.userid=this.readLocalStorageValue().userId;
 this.type=this.readLocalStorageValue().userType;
 console.log(this.userType)
 console.log(this.userid)
 if(this.userType){
   this.service.getmap({userId:this.userid}).subscribe((result)=>{
     console.log(result);
     this.dataSource = new MatTableDataSource(result.data?result.data:[]);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
     
   },(error)=>{
     console.log(error);
   })
    

 }else{
 this.service.getmap(null).subscribe((result)=>{
   console.log(result);
   this.dataSource = new MatTableDataSource(result.data?result.data:[]);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
 },(error)=>{
   console.log(error);
 })
}
}
applyFilter(filterValue: string) {
 this.dataSource.filter = filterValue.trim().toLowerCase();
 console.log(this.dataSource.filter)
 if (this.dataSource.paginator) {
   this.dataSource.paginator.firstPage();
 }

}

}
