import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayCount',
  standalone: true,
  pure: true,
})
export class CxpArrayCountPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, predicate?: (item: T, index: number) => boolean): number {
    if (!value) return 0; return predicate ? value.filter(predicate).length : value.length;
  }


}
