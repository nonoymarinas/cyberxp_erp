import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextReverse',
  standalone: true,
  pure: true,
})
export class CxpTextReversePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return Array.from(value ?? '').reverse().join('');
  }


}
