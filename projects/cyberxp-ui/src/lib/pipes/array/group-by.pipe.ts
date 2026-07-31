import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayGroupBy',
  standalone: true,
  pure: true,
})
export class CxpArrayGroupByPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, selectorFn: (item: T) => string | number): Record<string, T[]> {
    if (!value) return {}; return value.reduce<Record<string, T[]>>((groups, item) => { const group = String(selectorFn(item)); (groups[group] ??= []).push(item); return groups; }, {});
  }


}
