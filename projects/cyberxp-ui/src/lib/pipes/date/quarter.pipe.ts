import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
      name: 'cxpDateQuarter',
      standalone: true,
      pure: true,
    })
    export class CxpDateQuarterPipe implements PipeTransform {
      transform(value: Date | string | number | null | undefined): string {
        const date = this.toDate(value); if (!date) return ''; return `Q${Math.floor(date.getMonth() / 3) + 1}`;
      }


private toDate(value: Date | string | number | null | undefined): Date | null {
  if (value == null || value === '') return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

    }
