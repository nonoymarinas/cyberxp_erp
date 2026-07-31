import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayOrderBy',
  standalone: true,
  pure: true,
})
export class CxpArrayOrderByPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, key?: string, order: 'asc' | 'desc' = 'asc'): T[] {
    if (!value) return []; const direction = order === 'desc' ? -1 : 1; return [...value].sort((a, b) => this.compare(this.read(a, key), this.read(b, key)) * direction);
  }


         private read(item: unknown, key?: string): unknown {
           return key && item && typeof item === 'object'
             ? (item as Record<string, unknown>)[key]
             : item;
         }

         private compare(a: unknown, b: unknown): number {
           if (a == null && b == null) return 0;
           if (a == null) return -1;
           if (b == null) return 1;
           if (typeof a === 'number' && typeof b === 'number') return a - b;
           return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
         }

}
