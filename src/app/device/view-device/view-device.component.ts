
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router'
import { DataSource } from '@angular/cdk/table';
import { BackendserviceService } from 'src/app/backendservice.service';

@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.css']
})
export class ViewDeviceComponent implements OnInit {
  userType:string
  userrule:string
  user:Boolean
  displayedColumns: string[] = ['deviceId', 'deviceType', 'deviceManufacturer', 'imeiNumber','deviceTestEngineer','dateOfFirstRelease','simNumber','createdAt','edit','delete'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private service:BackendserviceService
  ) { }
  public localStorageItem() {
    console.log(localStorage.getItem("userInfo"))
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    console.log(userInfo)
    if (userInfo.userType !== "smartxengineer") {
      this.displayedColumns = ['deviceId', 'deviceType', 'deviceManufacturer', 'imeiNumber','deviceTestEngineer','dateOfFirstRelease','simNumber','createdAt'];
      return "true"
    } else {
      return "false";
    };
  }
  public show() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))

    if (userInfo.userType === "smartxengineer") {
      return true
    } else {
      return false;
    };
  }

  ngOnInit() {
    this.userType = this.localStorageItem();
  this.show()
    console.log(this.userType)
    this.service.getdevice(null).subscribe((result)=>{
      console.log(result);
      this.dataSource = new MatTableDataSource(result.data?result.data:[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
    },(error)=>{
      console.log(error);
    })
  }

  delete(_id){
    this.service.deletedevice(_id).subscribe(
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
