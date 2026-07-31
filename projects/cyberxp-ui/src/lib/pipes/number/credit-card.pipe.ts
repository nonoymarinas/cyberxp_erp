import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpNumberCreditCard',
  standalone: true,
  pure: true,
})
export class CxpNumberCreditCardPipe implements PipeTransform {
  transform(value: string | number | null | undefined): string {
    const digits = String(value ?? '').replace(/\D/g, ''); return digits.replace(/(.{4})/g, '$1 ').trim();
  }


}
