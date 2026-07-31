import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayMin',
  standalone: true,
  pure: true,
})
export class CxpArrayMinPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, selectorFn?: (item: T) => number): number | null {
    if (!value?.length) return null; return Math.min(...value.map(item => Number(selectorFn ? selectorFn(item) : item)));
  }


}
