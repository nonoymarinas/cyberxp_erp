import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpHrmsAttendanceStatus',
  standalone: true,
  pure: true,
})
export class CxpHrmsAttendanceStatusPipe implements PipeTransform {
  transform(value: string | null | undefined, fallback = 'No Status'): string {
    const text=(value ?? '').trim(); return text || fallback;
  }


}
