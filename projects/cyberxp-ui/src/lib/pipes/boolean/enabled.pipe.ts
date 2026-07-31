import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpBooleanEnabled',
  standalone: true,
  pure: true,
})
export class CxpBooleanEnabledPipe implements PipeTransform {
  transform(value: unknown, truthyLabel = 'Enabled', falsyLabel = 'Disabled'): string {
    return Boolean(value) ? truthyLabel : falsyLabel;
  }


}
