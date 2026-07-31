import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArraySkip',
  standalone: true,
  pure: true,
})
export class CxpArraySkipPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, count = 1): T[] {
    return value ? value.slice(Math.max(0, count)) : [];
  }


}
