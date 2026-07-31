import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpNumberCurrency',
  standalone: true,
  pure: true,
})
export class CxpNumberCurrencyPipe implements PipeTransform {
  transform(value: number | null | undefined, currency = 'PHP', locale = 'en-PH', minimumFractionDigits = 2, maximumFractionDigits = 2): string {
    if (value == null || !Number.isFinite(value)) return ''; return new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits, maximumFractionDigits }).format(value);
  }


}
