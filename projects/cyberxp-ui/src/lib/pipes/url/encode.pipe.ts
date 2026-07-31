import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpUrlEncode',
  standalone: true,
  pure: true,
})
export class CxpUrlEncodePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return encodeURIComponent(value ?? '');
  }


}
