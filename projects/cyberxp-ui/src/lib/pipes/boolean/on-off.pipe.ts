import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpBooleanOnOff',
  standalone: true,
  pure: true,
})
export class CxpBooleanOnOffPipe implements PipeTransform {
  transform(value: unknown, truthyLabel = 'On', falsyLabel = 'Off'): string {
    return Boolean(value) ? truthyLabel : falsyLabel;
  }


}
