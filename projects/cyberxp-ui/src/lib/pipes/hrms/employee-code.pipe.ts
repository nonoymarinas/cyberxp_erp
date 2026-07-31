import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpHrmsEmployeeCode',
  standalone: true,
  pure: true,
})
export class CxpHrmsEmployeeCodePipe implements PipeTransform {
  transform(value: string | number | null | undefined, length = 6): string {
    const text=String(value ?? ''); return text ? text.padStart(length, '0') : '';
  }


}
