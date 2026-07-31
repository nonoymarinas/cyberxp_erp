import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayLimit',
  standalone: true,
  pure: true,
})
export class CxpArrayLimitPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, count = 10): T[] {
    return value ? value.slice(0, Math.max(0, count)) : [];
  }


}
