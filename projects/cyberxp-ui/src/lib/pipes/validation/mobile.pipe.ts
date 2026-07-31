import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpValidationMobile',
  standalone: true,
  pure: true,
})
export class CxpValidationMobilePipe implements PipeTransform {
  transform(value: string | null | undefined): boolean {
    return /^(?:\+63|0)9\d{9}$/.test((value ?? '').trim());
  }


}
