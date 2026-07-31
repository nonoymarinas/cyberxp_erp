import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpHrmsPayrollStatus',
  standalone: true,
  pure: true,
})
export class CxpHrmsPayrollStatusPipe implements PipeTransform {
  transform(value: string | null | undefined, fallback = 'No Status'): string {
    const text=(value ?? '').trim(); return text || fallback;
  }


}
