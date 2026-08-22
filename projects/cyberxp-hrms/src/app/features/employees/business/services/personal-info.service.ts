import { Injectable, inject } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { PersonalInfoDataAccess } from '../../data/data-access/personal-info.data-access';import { PersonalInfoRefs } from '../../models/new-employee/personal-info/personal-info-ref.model';
import { SavePersonalInfoRequest } from '../../models/new-employee/personal-info/personal-info.model';
import { EmployeeDataResponse } from '../../models/new-employee/general/employee.model';
import { EmployeeState } from '../../state/employee-state.service';

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoService {
  private readonly dataAccess = inject(PersonalInfoDataAccess);
  private readonly employeeState = inject(EmployeeState);


  savePersonalInfo(request: SavePersonalInfoRequest): Observable<EmployeeDataResponse> {
    return this.dataAccess.savePersonalInfo(request).pipe(
      tap((response) => {
        if (!response.success) {
          return;
        }

        this.employeeState.setEmployeeData(response.data);
      }),
    );
  }

}
