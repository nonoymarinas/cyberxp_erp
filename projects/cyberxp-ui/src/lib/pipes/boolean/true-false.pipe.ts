import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpBooleanTrueFalse',
  standalone: true,
  pure: true,
})
export class CxpBooleanTrueFalsePipe implements PipeTransform {
  transform(value: unknown, truthyLabel = 'True', falsyLabel = 'False'): string {
    return Boolean(value) ? truthyLabel : falsyLabel;
  }


}
