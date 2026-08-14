import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  CxpIconChevronApp,
  CxpMenuPageItem,
} from 'cyberxp-ui';

import { UserAccessService } from '../../../../../core/authorization/services/user-access.services';
import { EMPLOYEE_PERMISSIONS } from '../../../../../core/authorization/permissions/employee-permissions';


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
export class NewEmployeePage {
  private readonly userAccessService =
    inject(UserAccessService);

  readonly permissions = EMPLOYEE_PERMISSIONS;

  get canCreatePersonalInfo(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.personalInfo.create,
    );
  }

  get canCreateAddress(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.address.create,
    );
  }

  get canCreateContact(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.contact.create,
    );
  }

  get canCreateEmergencyContact(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.emergencyContact.create,
    );
  }

  get canCreateBenefit(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.benefit.create,
    );
  }

  get canCreateEmployment(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.employment.create,
    );
  }

  get canCreateCompensation(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.compensation.create,
    );
  }
}