import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayAverage',
  standalone: true,
  pure: true,
})
export class CxpArrayAveragePipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, selectorFn?: (item: T) => number): number | null {
    if (!value?.length) return null; return value.reduce((total, item) => total + Number(selectorFn ? selectorFn(item) : item), 0) / value.length;
  }


}
