import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { query } from '@angular/animations';


@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {
// baseurl='http://localhost:3000'
baseurl='http://13.234.117.104:3000'

constructor(private http: HttpClient,
  ) { }
  isLoggedIn() {

    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getUserInfo(parm1) {
    if (!localStorage.getItem('userInfo'))
      return false;
    else
      return JSON.parse(localStorage.getItem('userInfo'))[parm1];
  }
logout(){
  return localStorage.removeItem('token')
}
  login(userDetails){
    return this.http.get<any>(this.baseurl+'/remotecare/r/user/login?userId=' + userDetails.userId + '&password='+userDetails.password+'');
  }
  adduser(Userform){
    return this.http.post<any>(this.baseurl+'/remotecare/i/user',Userform)
  }
  getuser(query){
    if(query==null){
    return this.http.get<any>(this.baseurl+'/remotecare/r/users');}
    else{
      return this.http.get<any>(this.baseurl+'/remotecare/r/users?userType='+query.userType+'')
    }
  }
  get(_id){
 if(_id==null){
    return this.http.get<any>(this.baseurl+'/remotecare/r/users');}
    else{
      console.log(_id)
      return this.http.get<any>(this.baseurl+'/remotecare/r/users?_id='+_id+'');
    }
  }
  updateuser(updateform){
    return this.http.put<any>(this.baseurl+'/remotecare/u/users',updateform);
  }
  deleteuser(_id){
    return this.http.delete<any>(this.baseurl+'/remotecare/d/users?_id='+_id+'');
  }
  adddevice(regForm){
    return this.http.post<any>(this.baseurl+'/remotecare/i/device',regForm);
  }
  
  totdevice(){
    return this.http.get<any>(this.baseurl+'/remotecare/r/admindetails');
  }
  getdevice(query){
    if(query==null){
      console.log(query)
      
      return this.http.get<any>(this.baseurl+'/remotecare/r/devices');
    }else{
     
      return this.http.get<any>(this.baseurl+'/remotecare/r/devices?isAssigned='+false+'');
    }
      
     }
    
    notassdevice(query){
      return this.http.get<any>(this.baseurl+'/remotecare/r/devices/unassigned');
     }
     getdeviceid(_id){
      if(_id==null){
         return this.http.get<any>(this.baseurl+'/remotecare/r/devices');}
         else{
           console.log(_id)
           return this.http.get<any>(this.baseurl+'/remotecare/r/devices?_id='+_id+'');
         }
       }
       updatedevice(updatedevice){
         return this.http.put<any>(this.baseurl+'/remotecare/u/devices',updatedevice);
       }
       deletedevice(_id){
         return this.http.delete<any>(this.baseurl+'/remotecare/d/devices?_id='+_id+'');
       }




  
  spi(){
    return this.http.get<any>(this.baseurl+'/remotecare/r/users?userType=ServiceProvider')
  }
  notasspatient(query){
    if(query==null){
      return this.http.get<any>(this.baseurl+'/remotecare/r/users')

    }else{
  return this.http.get<any>(this.baseurl+'/remotecare/r/users?isAssigned='+false+'&userType=Patient');}
  }
  addservice(serviceform){
    return this.http.post<any>(this.baseurl+'/remotecare/i/organization',serviceform);
  }
  getservice(){
    return this.http.get<any>(this.baseurl+'/remotecare/r/organization');
  }
  getserviceid(_id){
    if(_id==null){
       return this.http.get<any>(this.baseurl+'/remotecare/r/organization');}
       else{
         console.log(_id)
         return this.http.get<any>(this.baseurl+'/remotecare/r/organization?_id='+_id+'');
       }
     }
     updateservice(updateservice){
       return this.http.put<any>(this.baseurl+'/remotecare/u/organization',updateservice);
     }
     deleteservice(_id){
       return this.http.delete<any>(this.baseurl+'/remotecare/d/organization?_id='+_id+'');
     }
  addpatient(patientform){
    return this.http.post<any>(this.baseurl+'/remotecare/i/patientsession',patientform);
  }
  getpatient(){
    return this.http.get<any>(this.baseurl+'/remotecare/r/patientsessions');
  }

  register(Details){
    return this.http.post<any>(this.baseurl+'/smartsevika/i/register',Details);
  }
 addmap(mapForm){

  return this.http.post<any>(this.baseurl+'/remotecare/i/allocation/sp',mapForm);
 
  // return this.http.get<any>(this.baseurl+'/remotecare/i/allocation/sp?deviceId='+mapForm.deviceId+ '&serviceProviderId='+mapForm.serviceProviderId+'');
 }
 dashboarddetails(){
  return this.http.get<any>(this.baseurl+'/remotecare/r/details/dashboard');
 }
 areacode(area){
  return this.http.post<any>(this.baseurl+'/remotecare/i/areacode',area);
}
 moredetails(){
  return this.http.get<any>(this.baseurl+'/remotecare/r/details/dashboard/users/active')
 }
 assign(assignForm){
 
  console.log(query)
  return this.http.put<any>(this.baseurl+'/remotecare/u/devices',assignForm);

  }
  getform(){
    return this.http.get<any>(this.baseurl+'/remotecare/r/devices/assignedtoadmin');
  }
 notmap(){
  return this.http.get<any>(this.baseurl+'/remotecare/r/devices/unassigned');
 }
 admins(){
  return this.http.get<any>(this.baseurl+'/remotecare/r/users/admins'); 
 }
getmap(query){
  console.log(query)
  if(query==null){
    return this.http.get<any>(this.baseurl+'/remotecare/r/mapping');
  }else{

    return this.http.get<any>(this.baseurl+'/remotecare/r/mapping?createdBy='+query.userId+'');
  }


}
addcountry(countryform){
  return this.http.post<any>(this.baseurl+'/remotecare/i/countrycode',countryform);
}
getcountry(){
  return this.http.get<any>(this.baseurl+'/remotecare/r/countrycode');
}
}



  


 

