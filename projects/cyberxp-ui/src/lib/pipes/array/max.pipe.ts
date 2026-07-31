import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayMax',
  standalone: true,
  pure: true,
})
export class CxpArrayMaxPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, selectorFn?: (item: T) => number): number | null {
    if (!value?.length) return null; return Math.max(...value.map(item => Number(selectorFn ? selectorFn(item) : item)));
  }


}
