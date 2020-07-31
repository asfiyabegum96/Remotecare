
import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router'
import { DataSource } from '@angular/cdk/table'
import { BackendserviceService } from 'src/app/backendservice.service';

@Component({
  selector: 'app-view-assign',
  templateUrl: './view-assign.component.html',
  styleUrls: ['./view-assign.component.css']
})
export class ViewAssignComponent implements OnInit {
  userid:String
  userType:Boolean
  displayedColumns: string[] = ['deviceId', 'assignedToAdmin'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private service : BackendserviceService
  ) {

   }

   ngOnInit() {
   
    this.service.getform().subscribe((result)=>{
      console.log(result);
      this.dataSource = new MatTableDataSource(result.data?result.data:[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      

    },(error)=>{
      console.log(error);
    })
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

}

}