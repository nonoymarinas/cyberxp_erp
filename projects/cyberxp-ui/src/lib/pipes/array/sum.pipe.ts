import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArraySum',
  standalone: true,
  pure: true,
})
export class CxpArraySumPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, selectorFn?: (item: T) => number): number {
    if (!value) return 0; return value.reduce((total, item) => total + Number(selectorFn ? selectorFn(item) : item), 0);
  }


}
