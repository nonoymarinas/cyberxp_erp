import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
      name: 'cxpDateRelativeTime',
      standalone: true,
      pure: true,
    })
    export class CxpDateRelativeTimePipe implements PipeTransform {
      transform(value: Date | string | number | null | undefined, locale = 'en-PH'): string {
        const date = this.toDate(value); if (!date) return ''; const diff = date.getTime() - Date.now(); const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [['year', 31_536_000_000], ['month', 2_592_000_000], ['week', 604_800_000], ['day', 86_400_000], ['hour', 3_600_000], ['minute', 60_000], ['second', 1_000]]; const [unit, size] = units.find(([, size]) => Math.abs(diff) >= size) ?? ['second', 1_000]; return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(Math.round(diff / size), unit);
      }


private toDate(value: Date | string | number | null | undefined): Date | null {
  if (value == null || value === '') return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

    }
