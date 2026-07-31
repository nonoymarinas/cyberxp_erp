import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpHrmsLeaveStatus',
  standalone: true,
  pure: true,
})
export class CxpHrmsLeaveStatusPipe implements PipeTransform {
  transform(value: string | null | undefined, fallback = 'No Status'): string {
    const text=(value ?? '').trim(); return text || fallback;
  }


}
