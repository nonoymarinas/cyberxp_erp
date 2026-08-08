import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import {
  CxpIconChevronApp,
  CxpMenuPageItem,
} from 'cyberxp-ui';
import { EmployeeState } from '../../../state/employee-state.service';
@Component({
  selector: 'cxp-new-employee',
  templateUrl: './new-employee.html',
  styleUrl: './new-employee.css',
  imports: [
    
    CxpMenuPageItem,
    RouterOutlet,
    CxpIconChevronApp,
  ],
  providers:[EmployeeState]
})
export class NewEmployeePage {
   employeeGuid: string | null = null;
  employeeId: string | null = null;
}
