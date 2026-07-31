import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  CxpIconChevronApp,
  CxpMenuPageItem,
  CxpIconAddressNav,
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
} from 'cyberxp-ui';

@Component({
  selector: 'cxp-new-employee',
  templateUrl: './new-employee.html',
  styleUrl: './new-employee.css',
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
    CxpIconChevronApp,
  ],
})
export class NewEmployeePage {}
