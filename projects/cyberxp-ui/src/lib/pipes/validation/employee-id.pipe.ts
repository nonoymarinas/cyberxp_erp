import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpValidationEmployeeId',
  standalone: true,
  pure: true,
})
export class CxpValidationEmployeeIdPipe implements PipeTransform {
  transform(value: string | null | undefined): boolean {
    return /^[A-Za-z0-9][A-Za-z0-9_-]{2,31}$/.test((value ?? '').trim());
  }


}
