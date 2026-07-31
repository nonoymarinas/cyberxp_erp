import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpBooleanYesNo',
  standalone: true,
  pure: true,
})
export class CxpBooleanYesNoPipe implements PipeTransform {
  transform(value: unknown, truthyLabel = 'Yes', falsyLabel = 'No'): string {
    return Boolean(value) ? truthyLabel : falsyLabel;
  }


}
