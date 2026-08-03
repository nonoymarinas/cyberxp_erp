import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import {
  CxpIconChevronApp,
  CxpMenuPageItem,

} from 'cyberxp-ui';

@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
  imports: [CxpMenuPageItem, RouterOutlet, CxpIconChevronApp],
})
export class EmployeeDetailsPage {}
