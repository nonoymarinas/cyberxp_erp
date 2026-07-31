import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayDistinct',
  standalone: true,
  pure: true,
})
export class CxpArrayDistinctPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, key?: string): T[] {
    if (!value) return []; const seen = new Set<unknown>(); return value.filter(item => { const marker = key && item && typeof item === 'object' ? (item as Record<string, unknown>)[key] : item; if (seen.has(marker)) return false; seen.add(marker); return true; });
  }


}
