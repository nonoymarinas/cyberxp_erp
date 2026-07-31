import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpHrmsGender',
  standalone: true,
  pure: true,
})
export class CxpHrmsGenderPipe implements PipeTransform {
  transform(value: string | null | undefined, fallback = 'Not specified'): string {
    const text=(value ?? '').trim(); return text || fallback;
  }


}
