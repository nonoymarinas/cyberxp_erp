import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
      name: 'cxpDateWeekNumber',
      standalone: true,
      pure: true,
    })
    export class CxpDateWeekNumberPipe implements PipeTransform {
      transform(value: Date | string | number | null | undefined): number | null {
        const date = this.toDate(value); if (!date) return null; const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())); const day = utc.getUTCDay() || 7; utc.setUTCDate(utc.getUTCDate() + 4 - day); const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1)); return Math.ceil((((utc.getTime() - yearStart.getTime()) / 86_400_000) + 1) / 7);
      }


private toDate(value: Date | string | number | null | undefined): Date | null {
  if (value == null || value === '') return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

    }
