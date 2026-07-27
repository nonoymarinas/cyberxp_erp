import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CxpIconUserCircle, CxpInputText, CxpInputSearch, CxpButton } from 'cyberxp-ui';

@Component({
  selector: 'cxp-new-employee',
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
  imports: [
    CxpIconUserCircle,
    CxpInputText,
    CxpInputSearch,
    CxpButton,
    RouterLink,
    RouterOutlet
],
})
export class EmployeeListPage {}
