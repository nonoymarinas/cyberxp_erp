import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpHrmsEmployeeName',
  standalone: true,
  pure: true,
})
export class CxpHrmsEmployeeNamePipe implements PipeTransform {
  transform(value: { firstName?: string | null; middleName?: string | null; lastName?: string | null; suffix?: string | null } | null | undefined): string {
    if(!value)return ''; const middle=value.middleName?.trim(); const initial=middle?`${middle.charAt(0).toUpperCase()}.`:''; return [value.lastName ? `${value.lastName},` : '', value.firstName, initial, value.suffix].map(item=>item?.trim()).filter(Boolean).join(' ');
  }


}
