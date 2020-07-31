 import { NgModule } from '@angular/core';
 import { RouterModule, Routes } from '@angular/router';

import {HeaderComponent} from './header/header.component'
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { ViewDeviceComponent } from './device/view-device/view-device.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UpdateDeviceComponent } from './device/update-device/update-device.component';
import { AddOrgComponent } from './organisation/add-org/add-org.component';
import { ViewOrgComponent } from './organisation/view-org/view-org.component';
import { AddAssignComponent } from './assign/add-assign/add-assign.component';
import { UpdateOrgComponent } from './organisation/update-org/update-org.component';
import { ViewAssignComponent } from './assign/view-assign/view-assign.component';
import { AddAllocateComponent } from './allocate/add-allocate/add-allocate.component';
import { ViewAllocateComponent } from './allocate/view-allocate/view-allocate.component';

export  const routes: Routes = [
  {
        path: 'dashboard', component: HeaderComponent, 
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'about', component: AboutComponent },
          {path: 'add-user', component:AddUserComponent},
          {path: 'view-user', component:ViewUserComponent},
          {path:'update-user/:id',component:UpdateUserComponent},
          {path:'add-device',component:AddDeviceComponent},
          {path:'view-device',component:ViewDeviceComponent},
          {path:'update-device/:id',component:UpdateDeviceComponent},
          {path:'add-org',component:AddOrgComponent},
          {path:'view-org',component:ViewOrgComponent},
        {path:'update-org/:id',component:UpdateOrgComponent},
          {path:'add-assign',component:AddAssignComponent},
          {path:'view-assign',component:ViewAssignComponent},
          {path:'add-allocate',component:AddAllocateComponent},
          {path:'view-allocate',component:ViewAllocateComponent}
          

          
          
        ]
      },
     
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})

export class AppRoutingModule { }