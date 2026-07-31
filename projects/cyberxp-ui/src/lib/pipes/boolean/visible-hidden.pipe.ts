import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpBooleanVisibleHidden',
  standalone: true,
  pure: true,
})
export class CxpBooleanVisibleHiddenPipe implements PipeTransform {
  transform(value: unknown, truthyLabel = 'Visible', falsyLabel = 'Hidden'): string {
    return Boolean(value) ? truthyLabel : falsyLabel;
  }


}
