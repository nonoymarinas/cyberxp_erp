import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpNumberCompactNumber',
  standalone: true,
  pure: true,
})
export class CxpNumberCompactNumberPipe implements PipeTransform {
  transform(value: number | null | undefined, maximumFractionDigits = 1, locale = 'en-PH'): string {
    if (value == null || !Number.isFinite(value)) return ''; return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits }).format(value);
  }


}
