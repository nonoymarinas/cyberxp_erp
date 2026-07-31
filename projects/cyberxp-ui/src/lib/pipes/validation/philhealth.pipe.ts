import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpValidationPhilhealth',
  standalone: true,
  pure: true,
})
export class CxpValidationPhilhealthPipe implements PipeTransform {
  transform(value: string | null | undefined): boolean {
    return /^\d{2}-?\d{9}-?\d$/.test((value ?? '').trim());
  }


}
