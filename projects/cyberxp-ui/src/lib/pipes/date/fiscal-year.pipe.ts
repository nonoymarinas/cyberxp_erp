import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
      name: 'cxpDateFiscalYear',
      standalone: true,
      pure: true,
    })
    export class CxpDateFiscalYearPipe implements PipeTransform {
      transform(value: Date | string | number | null | undefined, startMonth = 1): string {
        const date = this.toDate(value); if (!date) return ''; const month = date.getMonth() + 1; const year = date.getFullYear(); const start = month >= startMonth ? year : year - 1; return `FY${start}-${String(start + 1).slice(-2)}`;
      }


private toDate(value: Date | string | number | null | undefined): Date | null {
  if (value == null || value === '') return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

    }
