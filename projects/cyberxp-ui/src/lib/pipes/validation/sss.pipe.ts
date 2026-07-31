import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpValidationSss',
  standalone: true,
  pure: true,
})
export class CxpValidationSssPipe implements PipeTransform {
  transform(value: string | null | undefined): boolean {
    return /^\d{2}-?\d{7}-?\d$/.test((value ?? '').trim());
  }


}
