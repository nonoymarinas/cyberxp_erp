import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
      name: 'cxpDateTimeAgo',
      standalone: true,
      pure: true,
    })
    export class CxpDateTimeAgoPipe implements PipeTransform {
      transform(value: Date | string | number | null | undefined): string {
        const date = this.toDate(value); if (!date) return ''; const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000)); const steps: Array<[number, string]> = [[31_536_000, 'year'], [2_592_000, 'month'], [604_800, 'week'], [86_400, 'day'], [3_600, 'hour'], [60, 'minute'], [1, 'second']]; const [size, label] = steps.find(([size]) => seconds >= size) ?? [1, 'second']; const amount = Math.floor(seconds / size); return `${amount} ${label}${amount === 1 ? '' : 's'} ago`;
      }


private toDate(value: Date | string | number | null | undefined): Date | null {
  if (value == null || value === '') return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

    }
