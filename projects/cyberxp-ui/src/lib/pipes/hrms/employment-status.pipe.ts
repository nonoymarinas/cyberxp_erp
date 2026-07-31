import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpHrmsEmploymentStatus',
  standalone: true,
  pure: true,
})
export class CxpHrmsEmploymentStatusPipe implements PipeTransform {
  transform(value: string | null | undefined, fallback = 'No Status'): string {
    const text=(value ?? '').trim(); return text || fallback;
  }


}
