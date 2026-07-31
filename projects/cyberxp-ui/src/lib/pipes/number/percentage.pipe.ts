import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpNumberPercentage',
  standalone: true,
  pure: true,
})
export class CxpNumberPercentagePipe implements PipeTransform {
  transform(value: number | null | undefined, minimumFractionDigits = 0, maximumFractionDigits = 2, locale = 'en-PH'): string {
    if (value == null || !Number.isFinite(value)) return ''; return new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits, maximumFractionDigits }).format(value);
  }


}
