import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpBooleanInactive',
  standalone: true,
  pure: true,
})
export class CxpBooleanInactivePipe implements PipeTransform {
  transform(value: unknown, truthyLabel = 'Inactive', falsyLabel = 'Active'): string {
    return Boolean(value) ? truthyLabel : falsyLabel;
  }


}
