import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpBooleanActive',
  standalone: true,
  pure: true,
})
export class CxpBooleanActivePipe implements PipeTransform {
  transform(value: unknown, truthyLabel = 'Active', falsyLabel = 'Inactive'): string {
    return Boolean(value) ? truthyLabel : falsyLabel;
  }


}
