import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpNumberPhoneNumber',
  standalone: true,
  pure: true,
})
export class CxpNumberPhoneNumberPipe implements PipeTransform {
  transform(value: string | number | null | undefined): string {
    const text = String(value ?? ''); const digits = text.replace(/\D/g, ''); if (digits.length === 11 && digits.startsWith('09')) return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`; return text;
  }


}
