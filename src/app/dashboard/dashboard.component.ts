import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profileImage : string = './assets/user.png'

  selected: Date | null = new Date();
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any = {}

  editAdminStatus : boolean = false;
  showSidebar: boolean = true;
  stdLength: number = 0;
  constructor(private api: AdminApiService) {
    this.chartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Student Data'
      },
      tooltip: {
        valueSuffix: '%'
      },
      // subtitle: {
      //   text:
      //     'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
      // },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: true,
            distance: 20
          }, {
            enabled: true,
            distance: -20,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '0.6rem',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10
            }
          }]
        }
      },
      credits:{
        enabled : false
      },
      series: [
        {
          name: 'Percentage',
          colorByPoint: true,
          data: [
            {
              name: 'Btech',
              y: 55.02
            },
            {
              name: 'Polytechnic',
              sliced: true,
              selected: true,
              y: 26.71
            },
            {
              name: 'MCA',
              y: 1.09
            },
            {
              name: 'BCA',
              y: 15.5
            },
            {
              name: 'Other',
              y: 1.68
            }
          ]
        }
      ]
    }
  }
  ngOnInit(): void {
    this.getAllStudentLength();
  }

  getAllStudentLength() {
    this.api.getAllStudentsApi().subscribe({
      next: (res: any) => {
        this.stdLength = res.length - 1
      }
    })
  }

  hideSideBar() {
    this.showSidebar = !this.showSidebar;
  }


}


