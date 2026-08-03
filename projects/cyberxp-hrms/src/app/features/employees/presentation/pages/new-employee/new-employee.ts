import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  CxpIconChevronApp,
  CxpMenuPageItem,
} from 'cyberxp-ui';

@Component({
  selector: 'cxp-new-employee',
  templateUrl: './new-employee.html',
  styleUrl: './new-employee.css',
  imports: [
    
    CxpMenuPageItem,
    RouterOutlet,
    CxpIconChevronApp,
  ],
})
export class NewEmployeePage {}
