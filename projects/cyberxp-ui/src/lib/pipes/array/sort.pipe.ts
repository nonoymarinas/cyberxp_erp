import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArraySort',
  standalone: true,
  pure: true,
})
export class CxpArraySortPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, compareFn: (a: T, b: T) => number = (a, b) => String(a).localeCompare(String(b))): T[] {
    return value ? [...value].sort(compareFn) : [];
  }


}
