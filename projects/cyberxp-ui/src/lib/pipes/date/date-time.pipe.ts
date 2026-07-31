import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
      name: 'cxpDateDateTime',
      standalone: true,
      pure: true,
    })
    export class CxpDateDateTimePipe implements PipeTransform {
      transform(value: Date | string | number | null | undefined, locale = 'en-PH', options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }): string {
        const date = this.toDate(value); return date ? new Intl.DateTimeFormat(locale, options).format(date) : '';
      }


private toDate(value: Date | string | number | null | undefined): Date | null {
  if (value == null || value === '') return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

    }
