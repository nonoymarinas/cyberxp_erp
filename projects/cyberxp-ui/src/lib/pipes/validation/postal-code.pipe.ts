import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpValidationPostalCode',
  standalone: true,
  pure: true,
})
export class CxpValidationPostalCodePipe implements PipeTransform {
  transform(value: string | null | undefined): boolean {
    return /^\d{4}$/.test((value ?? '').trim());
  }


}
