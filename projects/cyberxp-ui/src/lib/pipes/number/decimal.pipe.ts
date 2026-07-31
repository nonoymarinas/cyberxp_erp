import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpNumberDecimal',
  standalone: true,
  pure: true,
})
export class CxpNumberDecimalPipe implements PipeTransform {
  transform(value: number | null | undefined, minimumFractionDigits = 0, maximumFractionDigits = 2, locale = 'en-PH'): string {
    if (value == null || !Number.isFinite(value)) return ''; return new Intl.NumberFormat(locale, { minimumFractionDigits, maximumFractionDigits }).format(value);
  }


}
