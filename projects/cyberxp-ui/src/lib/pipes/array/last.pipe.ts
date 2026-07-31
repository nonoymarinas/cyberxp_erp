import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayLast',
  standalone: true,
  pure: true,
})
export class CxpArrayLastPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined): T | null {
    return value && value.length ? value[value.length - 1] : null;
  }


}
