import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpValidationTelephone',
  standalone: true,
  pure: true,
})
export class CxpValidationTelephonePipe implements PipeTransform {
  transform(value: string | null | undefined): boolean {
    return /^(?:\+63|0)?\d{7,10}$/.test((value ?? '').trim());
  }


}
