import { Component } from '@angular/core';
import { BackendserviceService } from '../backendservice.service';
import { forkJoin } from 'rxjs';
import * as Highcharts from 'highcharts';

@Component({
   selector: 'app-header-component',
   templateUrl: './home.component.html',
})
export class HomeComponent {
   highcharts = Highcharts;
   chartOptions = {
      chart: {
         plotBorderWidth: null,
         plotShadow: false
      },
      title: {
         text: 'Users'
      },
      tooltip: {
         pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
         pie: {
            shadow: false,
            center: ['50%', '50%'],
            size: '100%',
            innerSize: '70%',

            allowPointSelect: true,
            cursor: 'pointer',

            dataLabels: {
               enabled: true,
               formatter: function () {
                  return this.key + '<br>Count: ' + this.y;
               }
            },

            showInLegend: true
         }
      },
      colors: ['#beebdf', '#59ba9f', '#098f69', '#02573f'],
      series: [{
         type: 'pie',
         name: 'Users count',
         data: [
            ['Patients', 0],
            ['Admins', 0],
            ['Doctors & Service providers', 0],
            ['Support Engineers', 0],
         ]
      }]
   };

   alertChartOptions = {
      chart: {
         plotBorderWidth: null,
         plotShadow: false
      },
      colors: ['#eded09', '#e0143a'],
      title: {
         text: 'Alerts'
      },
      tooltip: {
         pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
         pie: {

            allowPointSelect: true,
            cursor: 'pointer',

            dataLabels: {
               enabled: true,
               formatter: function () {
                  return this.key + '<br>Count: ' + this.y;
               }
            },
            showInLegend: true
         }
      },
      series: [{
         type: 'pie',
         name: 'Alerts count',
         data: [
            ['Total Alerts', 50],
            {
               name: 'Red Alerts',
               y: 15,
               sliced: true,
               selected: true
            },
         ]
      }]
   };

   devicesChartOptions = {
      chart: {
         type: 'bar'
      },
      title: {
         text: 'Devices'
      },

      legend: {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'top',
         x: 500,
         y: 100,
         floating: true,
         borderWidth: 1,

         backgroundColor: (
            '#FFFFFF'), shadow: true
      },
      xAxis: {
         categories: ['Total devices', 'Assigned to doctors & service providers', 'Active devices', 'Inactive devices',], title: {
            text: null
         },
      },
      yAxis: {
         min: 0, title: {
            text: 'Count', align: 'high'
         },
         labels: {
            overflow: 'justify'
         },
      },
      plotOptions: {
         bar: {
            dataLabels: {
               enabled: true
            }
         },
         series: {
            stacking: 'normal'
         }
      },
      colors: ['#10459c'],
      credits: {
         enabled: false
      },
      series: [
         {
            name: 'Count',
            data: [0, 0, 0, 0],
         },

      ]
   };
   patientsChartOptions = {
      chart: {
         type: 'bar'
      },
      title: {
         text: 'Patients'
      },

      legend: {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'top',
         x: 500,
         y: 100,
         floating: true,
         borderWidth: 1,
         backgroundColor: (
            '#FFFFFF'), shadow: true
      },
      colors: ['#4d87e8'],
      xAxis: {
         categories: ['Total patients', 'Current patients', 'Past patients',], title: {
            text: null
         }
      },
      yAxis: {
         min: 0, title: {
            text: 'Count', align: 'high'
         },
         labels: {
            overflow: 'justify'
         }
      },
      plotOptions: {
         bar: {
            dataLabels: {
               enabled: true
            }
         },
         series: {
            stacking: 'normal'
         }
      },
      credits: {
         enabled: false
      },
      series: [
         {
            name: 'Count',
            data: [0, 0, 0],
            borderRadius: 10
         },

      ]
   };
   totalUsers = 0;
   updateForm: boolean;
   users: Array<any> = [];
   totalDevices = 0;
   adminCount = 0;
   serviceCount = 0;
   engineerCount = 0;
   patientCount = 0;
   currentPatients = 0;
   pastPatients = 0;
   patients = [];
   devices = [];
   assignedDevices = 0;
   inactiveDevices = 0;
   constructor(
      private service: BackendserviceService
   ) { }

   ngOnInit() {
      forkJoin(this.service.getuser(null), this.service.getdevice(null))
         .subscribe((dataArray: Array<any>) => {
            this.users = dataArray[0].data;
            this.totalUsers = dataArray[0].data ? dataArray[0].data.length : 0;
            this.totalDevices = dataArray[1].data ? dataArray[1].data.length : 0;
            this.devices = dataArray[1].data;
            this.handleUsersData();
            this.handlePatients();
            this.handleDevices();
         }, (error) => {
            console.log(error);
         })
   }

   handleUsersData(): void {
      if (this.users.length) {
         this.users.forEach(element => {
            // if (element.extraRole && element.extraRole.length) {
            //    element.extraRole.forEach(roleElement => {
            //       this.updateUserSeries(roleElement)
            //    });
            // }
            this.updateUserSeries(element.userType, element)
         });
      }
   }

   handlePatients(): void {
      if (this.patients.length) {
         this.patients.forEach(element => {
            if (element.isActive === "true".trim() || element.isActive === true) {
               this.currentPatients++;
               this.patientsChartOptions.series[0].data[1] = this.currentPatients;
            } else {
               this.pastPatients++;
               this.patientsChartOptions.series[0].data[2] = this.pastPatients;
            }
            this.updateForm = true;
         });
      }
   }

   handleDevices(): void {
      if (this.devices.length) {
         this.devicesChartOptions.series[0].data[0] = this.totalDevices;
         this.devices.forEach(element => {
            if (element.assignedToAdmin) {
               this.assignedDevices++;
               this.devicesChartOptions.series[0].data[1] = this.assignedDevices;
               this.devicesChartOptions.series[0].data[2] = this.assignedDevices;
            } else {
               this.inactiveDevices++;
               this.devicesChartOptions.series[0].data[3] = this.inactiveDevices;
            }
            this.updateForm = true;
         });
      }
   }

   updateUserSeries(element, currentUser) {
      switch (element) {
         case 'superadmin':
         case 'admin':
            this.adminCount++;
            this.chartOptions.series[0].data[1] = ['Admins', this.adminCount];
            break;
         case 'ServiceProvider':
            this.serviceCount++;
            this.chartOptions.series[0].data[2] = ['Doctors & Service providers', this.serviceCount];
            break;
         case 'smartxengineer':
            this.engineerCount++;
            this.chartOptions.series[0].data[3] = ['Support Engineers', this.engineerCount];
            break;
         case 'Patient':
            this.patients.push(currentUser)
            this.patientCount++;
            this.chartOptions.series[0].data[0] = ['Patients', this.patientCount];
            this.patientsChartOptions.series[0].data[0] = this.patientCount;

            break;
      }
      this.updateForm = true;
   }
}