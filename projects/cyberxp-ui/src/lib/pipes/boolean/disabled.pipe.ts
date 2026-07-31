import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpBooleanDisabled',
  standalone: true,
  pure: true,
})
export class CxpBooleanDisabledPipe implements PipeTransform {
  transform(value: unknown, truthyLabel = 'Disabled', falsyLabel = 'Enabled'): string {
    return Boolean(value) ? truthyLabel : falsyLabel;
  }


}
