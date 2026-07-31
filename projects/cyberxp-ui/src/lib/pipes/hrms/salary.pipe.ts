import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpHrmsSalary',
  standalone: true,
  pure: true,
})
export class CxpHrmsSalaryPipe implements PipeTransform {
  transform(value: number | null | undefined, currency = 'PHP', locale = 'en-PH'): string {
    if(value==null||!Number.isFinite(value))return ''; return new Intl.NumberFormat(locale,{style:'currency',currency,minimumFractionDigits:2,maximumFractionDigits:2}).format(value);
  }


}
