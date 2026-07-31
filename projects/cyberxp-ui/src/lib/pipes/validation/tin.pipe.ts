import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpValidationTin',
  standalone: true,
  pure: true,
})
export class CxpValidationTinPipe implements PipeTransform {
  transform(value: string | null | undefined): boolean {
    return /^\d{3}-?\d{3}-?\d{3}-?\d{3,5}$/.test((value ?? '').trim());
  }


}
