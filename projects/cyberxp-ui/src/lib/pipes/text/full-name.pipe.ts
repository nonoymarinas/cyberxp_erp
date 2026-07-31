import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextFullName',
  standalone: true,
  pure: true,
})
export class CxpTextFullNamePipe implements PipeTransform {
  transform(value: { firstName?: string | null; middleName?: string | null; lastName?: string | null; suffix?: string | null } | null | undefined): string {
    if (!value) return ''; const middle = value.middleName?.trim(); const middleInitial = middle ? `${middle.charAt(0).toUpperCase()}.` : ''; return [value.firstName, middleInitial, value.lastName, value.suffix].map(item => item?.trim()).filter(Boolean).join(' ');
  }


}
