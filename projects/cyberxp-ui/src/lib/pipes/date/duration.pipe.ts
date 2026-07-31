import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpDateDuration',
  standalone: true,
  pure: true,
})
export class CxpDateDurationPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null || !Number.isFinite(value) || value < 0) return ''; const total = Math.floor(value); const hours = Math.floor(total / 3600); const minutes = Math.floor((total % 3600) / 60); const seconds = total % 60; return [hours ? `${hours}h` : '', minutes ? `${minutes}m` : '', seconds || (!hours && !minutes) ? `${seconds}s` : ''].filter(Boolean).join(' ');
  }


}
