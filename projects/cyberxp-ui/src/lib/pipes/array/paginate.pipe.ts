import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayPaginate',
  standalone: true,
  pure: true,
})
export class CxpArrayPaginatePipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, page = 1, pageSize = 10): T[] {
    if (!value || pageSize <= 0) return []; const start = Math.max(0, page - 1) * pageSize; return value.slice(start, start + pageSize);
  }


}
