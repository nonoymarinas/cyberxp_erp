import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
      name: 'cxpDateTimeFormat',
      standalone: true,
      pure: true,
    })
    export class CxpDateTimeFormatPipe implements PipeTransform {
      transform(value: Date | string | number | null | undefined, locale = 'en-PH', options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }): string {
        const date = this.toDate(value); return date ? new Intl.DateTimeFormat(locale, options).format(date) : '';
      }


private toDate(value: Date | string | number | null | undefined): Date | null {
  if (value == null || value === '') return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

    }
