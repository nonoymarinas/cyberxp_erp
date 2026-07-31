import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpValidationPagibig',
  standalone: true,
  pure: true,
})
export class CxpValidationPagibigPipe implements PipeTransform {
  transform(value: string | null | undefined): boolean {
    return /^\d{4}-?\d{4}-?\d{4}$/.test((value ?? '').trim());
  }


}
