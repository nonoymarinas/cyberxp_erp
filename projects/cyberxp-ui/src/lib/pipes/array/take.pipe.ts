import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayTake',
  standalone: true,
  pure: true,
})
export class CxpArrayTakePipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, count = 1): T[] {
    return value ? value.slice(0, Math.max(0, count)) : [];
  }


}
