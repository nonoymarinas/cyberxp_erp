import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayFlatten',
  standalone: true,
  pure: true,
})
export class CxpArrayFlattenPipe implements PipeTransform {
  transform<T>(value: readonly (T | readonly T[])[] | null | undefined, depth = 1): T[] {
    return value ? value.flat(depth) as T[] : [];
  }


}
