import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
      name: 'cxpDateCountdown',
      standalone: true,
      pure: true,
    })
    export class CxpDateCountdownPipe implements PipeTransform {
      transform(value: Date | string | number | null | undefined): string {
        const date = this.toDate(value); if (!date) return ''; const diff = Math.max(0, date.getTime() - Date.now()); const days = Math.floor(diff / 86_400_000); const hours = Math.floor((diff % 86_400_000) / 3_600_000); const minutes = Math.floor((diff % 3_600_000) / 60_000); const seconds = Math.floor((diff % 60_000) / 1_000); return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }


private toDate(value: Date | string | number | null | undefined): Date | null {
  if (value == null || value === '') return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

    }
