import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {CxpIconChevronApp,CxpMenuPageItem,CxpIconAddressNav, CxpIconUserCircle, CxpIconAppNav, CxpIconHrmsApp, CxpIconUserNav, CxpIconHomeNav, CxpIconAppStatic, CxpIconTnmsApp, CxpIconAtmsApp, CxpInputText, CxpInputSelect, CxpButton } from 'cyberxp-ui';

@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
  imports: [
    CxpIconUserCircle,
    CxpIconAppNav,
    CxpIconHrmsApp,
    CxpIconUserNav,
    CxpIconHomeNav,
    CxpIconAppStatic,
    CxpIconTnmsApp,
    CxpIconAtmsApp,
    CxpInputText,
    CxpInputSelect,
    CxpButton,
    CxpIconAddressNav,
    CxpMenuPageItem,
    RouterOutlet,
    CxpIconChevronApp
],
})
export class EmployeeDetailsPage {}
