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
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
               enabled: false
            },

            showInLegend: true
         }
      },
      colors: ['#beebdf', '#59ba9f', '#098f69', '#02573f'],
      series: [{
         type: 'pie',
         name: 'Users count',
         data: [
            ['Patients', 45.0],
            ['Admins', 26.8],
            ['Doctors & Service providers', 8.5],
            ['Support Engineers', 6.2],
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
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
         pie: {

            allowPointSelect: true,
            cursor: 'pointer',

            dataLabels: {
               enabled: false
            },

            showInLegend: true
         }
      },
      series: [{
         type: 'pie',
         name: 'Alerts count',
         data: [
            ['Total Alerts', 45.0],
            {
               name: 'Red Alerts',
               y: 12.8,
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
         x: 250,
         y: 100,
         floating: true,
         borderWidth: 1,

         backgroundColor: (
            '#FFFFFF'), shadow: true
      },
      xAxis: {
         categories: ['Total devices', 'Assigned to doctors & service providers', 'Active devices', 'Inactive devices',], title: {
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
      colors: ['#10459c'],
      credits: {
         enabled: false
      },
      series: [
         {
            name: 'Count',
            data: [107, 31, 635, 203,],
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
         x: 250,
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
            data: [160, 250, 410,],
            borderRadius: 10
         },

      ]
   };
   totalUsers = 0;
   totalDevices = 0;
   totalPatients = 0;
   constructor(
      private service: BackendserviceService
   ) { }

   ngOnInit() {
      forkJoin(this.service.getuser(null), this.service.getdevice(null), this.service.getpatient())
         .subscribe((dataArray: Array<any>) => {
            this.totalUsers = dataArray[0].data.length;
            this.totalDevices = dataArray[1].data.length;
            this.totalPatients = dataArray[2].data.length;
         }, (error) => {
            console.log(error);
         })
   }
}