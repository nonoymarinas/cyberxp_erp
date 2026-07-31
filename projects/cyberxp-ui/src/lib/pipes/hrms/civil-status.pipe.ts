import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpHrmsCivilStatus',
  standalone: true,
  pure: true,
})
export class CxpHrmsCivilStatusPipe implements PipeTransform {
  transform(value: string | null | undefined, fallback = 'Not specified'): string {
    const text=(value ?? '').trim(); return text || fallback;
  }


}
