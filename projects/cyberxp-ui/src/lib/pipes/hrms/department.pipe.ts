import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpHrmsDepartment',
  standalone: true,
  pure: true,
})
export class CxpHrmsDepartmentPipe implements PipeTransform {
  transform(value: string | null | undefined, fallback = 'No Department'): string {
    const text=(value ?? '').trim(); return text || fallback;
  }


}
