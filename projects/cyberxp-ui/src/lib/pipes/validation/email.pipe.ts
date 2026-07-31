import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpValidationEmail',
  standalone: true,
  pure: true,
})
export class CxpValidationEmailPipe implements PipeTransform {
  transform(value: string | null | undefined): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value ?? '').trim());
  }


}
