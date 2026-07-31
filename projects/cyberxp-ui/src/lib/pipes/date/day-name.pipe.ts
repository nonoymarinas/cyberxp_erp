import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
      name: 'cxpDateDayName',
      standalone: true,
      pure: true,
    })
    export class CxpDateDayNamePipe implements PipeTransform {
      transform(value: Date | string | number | null | undefined, locale = 'en-PH', format: 'long' | 'short' | 'narrow' = 'long'): string {
        const date = this.toDate(value); return date ? new Intl.DateTimeFormat(locale, { weekday: format }).format(date) : '';
      }


private toDate(value: Date | string | number | null | undefined): Date | null {
  if (value == null || value === '') return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

    }
