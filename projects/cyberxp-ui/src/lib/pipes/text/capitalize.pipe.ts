import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextCapitalize',
  standalone: true,
  pure: true,
})
export class CxpTextCapitalizePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    const text = (value ?? '').trim(); return text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : '';
  }


}
