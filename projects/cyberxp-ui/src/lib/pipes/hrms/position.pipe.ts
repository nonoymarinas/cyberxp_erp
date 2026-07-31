import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpHrmsPosition',
  standalone: true,
  pure: true,
})
export class CxpHrmsPositionPipe implements PipeTransform {
  transform(value: string | null | undefined, fallback = 'No Position'): string {
    const text=(value ?? '').trim(); return text || fallback;
  }


}
