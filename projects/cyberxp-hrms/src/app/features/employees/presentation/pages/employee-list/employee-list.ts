import { Component } from '@angular/core';
import {  RouterOutlet, RouterLink } from '@angular/router';
import { CxpIconUserCircle, CxpInputSearch, CxpButton } from 'cyberxp-ui';

@Component({
  selector: 'cxp-new-employee',
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
  imports: [CxpIconUserCircle, CxpInputSearch, CxpButton, RouterLink, RouterOutlet],
})
export class EmployeeListPage {}
