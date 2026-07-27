import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CxpChartDonutApp } from '../../components/cxp-chart-donut-app/cxp-chart-donut-app';
import { CxpChartBarApp } from '../../components/cxp-chart-bar-app/cxp-chart-bar-app';
import {
  CxpIconUserCircle,
  CxpIconAppNav,
  CxpIconHrmsApp,
  CxpIconUserNav,
  CxpIconHomeNav,
  CxpIconAppStatic,
  CxpIconTnmsApp,
  CxpIconAtmsApp,
  CxpIconChartNav,
  CxpChartDonutItem,
} from 'cyberxp-ui';

export interface AttendanceBarItem {
  day: string;
  date: string;
  present: number;
  late: number;
  absent: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [
    CxpIconUserCircle,
    CxpIconAppNav,
    CxpIconHrmsApp,
    CxpIconUserNav,
    CxpIconHomeNav,
    CxpIconAppStatic,
    CxpIconTnmsApp,
    CxpIconAtmsApp,
    CxpChartDonutApp,
    CxpIconChartNav,
    CxpChartBarApp,
  ],
})
export class DashboardPage {
  
  employeeSummary: CxpChartDonutItem[] = [
    {
      label: 'Regular',
      alias: 'RG',
      value: 25,
      color: '--color-background-08',
    },
    {
      label: 'Project Based',
      value: 35,
      alias: 'PB',
      color: '--color-background-06',
    },
    {
      label: 'Partime',
      value: 40,
      alias: 'PT',
      color: '--color-background-04',
    },
    {
      label: 'Contractual',
      value: 40,
      alias: 'CT',
      color: '--color-background-02',
    },
    {
      label: 'Probationary',
      value: 40,
      alias: 'PR',
      color: '--color-background-00',
    },
  ];

 attendanceData: AttendanceBarItem[] = [
  { day: 'Mon', date: 'Jul 02', present: 84, late: 9, absent: 7 },
  { day: 'Tue', date: 'Jul 03', present: 88, late: 7, absent: 5 },
  { day: 'Wed', date: 'Jul 04', present: 91, late: 4, absent: 5 },
  { day: 'Thu', date: 'Jul 05', present: 87, late: 8, absent: 5 },
  { day: 'Fri', date: 'Jul 06', present: 82, late: 10, absent: 8 },
  { day: 'Sat', date: 'Jul 07', present: 56, late: 6, absent: 38 },
  { day: 'Sun', date: 'Jul 08', present: 22, late: 2, absent: 76 },

  { day: 'Mon', date: 'Jul 09', present: 85, late: 8, absent: 7 },
  { day: 'Tue', date: 'Jul 10', present: 89, late: 6, absent: 5 },
  { day: 'Wed', date: 'Jul 11', present: 92, late: 3, absent: 5 },
  { day: 'Thu', date: 'Jul 12', present: 88, late: 7, absent: 5 },
  { day: 'Fri', date: 'Jul 13', present: 83, late: 9, absent: 8 },
  { day: 'Sat', date: 'Jul 14', present: 60, late: 5, absent: 35 },
  { day: 'Sun', date: 'Jul 15', present: 25, late: 1, absent: 74 },

  { day: 'Mon', date: 'Jul 16', present: 86, late: 7, absent: 7 },
  { day: 'Tue', date: 'Jul 17', present: 90, late: 5, absent: 5 },
  { day: 'Wed', date: 'Jul 18', present: 93, late: 3, absent: 4 },
  { day: 'Thu', date: 'Jul 19', present: 89, late: 6, absent: 5 },
  { day: 'Fri', date: 'Jul 20', present: 84, late: 8, absent: 8 },
  { day: 'Sat', date: 'Jul 21', present: 63, late: 5, absent: 32 },
  { day: 'Sun', date: 'Jul 22', present: 28, late: 2, absent: 70 },

  { day: 'Mon', date: 'Jul 23', present: 87, late: 6, absent: 7 },
  { day: 'Tue', date: 'Jul 24', present: 91, late: 4, absent: 5 },
];
}
