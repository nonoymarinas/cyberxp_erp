import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayFilter',
  standalone: true,
  pure: true,
})
export class CxpArrayFilterPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, predicate?: (item: T, index: number) => boolean): T[] {
    if (!value) return []; return predicate ? value.filter(predicate) : [...value];
  }


}
