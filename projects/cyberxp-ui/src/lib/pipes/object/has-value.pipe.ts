import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpObjectHasValue',
  standalone: true,
  pure: true,
})
export class CxpObjectHasValuePipe implements PipeTransform {
  transform(value: unknown): boolean {
    if (value == null) return false; if (typeof value === 'string') return value.trim().length > 0; if (Array.isArray(value)) return value.length > 0; if (typeof value === 'object') return Object.keys(value as object).length > 0; return true;
  }


}
