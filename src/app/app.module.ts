import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip'
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { MatNativeDateModule } from '@angular/material/core';


import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatRadioModule } from "@angular/material/radio";


import { AppComponent } from './app.component';
import { HomeComponent }  from './home/home.component';
import { HeaderComponent }  from './header/header.component';
import { AboutComponent }  from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';


import { GuardsGuard } from './guards.guard';
import {TokenInterceptorService} from './token-interceptor.service';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { ViewDeviceComponent } from './device/view-device/view-device.component';
import { UpdateDeviceComponent } from './device/update-device/update-device.component';
import { AddOrgComponent } from './organisation/add-org/add-org.component';
import { ViewOrgComponent } from './organisation/view-org/view-org.component';
import { UpdateOrgComponent } from './organisation/update-org/update-org.component';
import { AddAssignComponent } from './assign/add-assign/add-assign.component';
import { ViewAssignComponent } from './assign/view-assign/view-assign.component';
import { AddAllocateComponent } from './allocate/add-allocate/add-allocate.component';
import { ViewAllocateComponent } from './allocate/view-allocate/view-allocate.component'
@NgModule({
  declarations: [
    AppComponent, HomeComponent, LoginComponent, HeaderComponent, AboutComponent, AddUserComponent, ViewUserComponent, UpdateUserComponent, AddDeviceComponent, ViewDeviceComponent, UpdateDeviceComponent, AddOrgComponent, ViewOrgComponent, UpdateOrgComponent, AddAssignComponent, ViewAssignComponent, AddAllocateComponent, ViewAllocateComponent, 
  ],
  imports: [
    BrowserModule,  AppRoutingModule,FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
   MatNativeDateModule,
    FormsModule,
    MatTooltipModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatCardModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatGridListModule,
    MatInputModule,
    MatProgressBarModule,
    MatStepperModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    
    MatRadioModule
  
   
  ],
  providers: [GuardsGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
