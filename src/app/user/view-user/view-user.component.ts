import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {BackendserviceService} from 'src/app/backendservice.service'
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  displayedColumns: string[] = [ 'userType', 'userName', 'gender', 'age', 'address', 'emailId', 'mobileNumber',  'edit','delete'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private service:BackendserviceService
  ) { }

  ngOnInit() {
    this.service.getuser(null).subscribe((result) => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result.data ? result.data : []);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    
    }, (error) => {
      console.log(error);
    })

    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(userInfo.userType=="admin"){
      this.displayedColumns = [ 'userType', 'userName',  'address','address2', 'emailId', 'mobileNumber', 'location', 'edit','delete'];
    }
  }
  delete(_id){
    this.service.deleteuser(_id).subscribe(
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
