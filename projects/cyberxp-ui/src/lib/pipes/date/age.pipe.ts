import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
      name: 'cxpDateAge',
      standalone: true,
      pure: true,
    })
    export class CxpDateAgePipe implements PipeTransform {
      transform(value: Date | string | number | null | undefined): number | null {
        const date = this.toDate(value); if (!date) return null; const today = new Date(); let age = today.getFullYear() - date.getFullYear(); const month = today.getMonth() - date.getMonth(); if (month < 0 || (month === 0 && today.getDate() < date.getDate())) age--; return Math.max(0, age);
      }


private toDate(value: Date | string | number | null | undefined): Date | null {
  if (value == null || value === '') return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

    }
