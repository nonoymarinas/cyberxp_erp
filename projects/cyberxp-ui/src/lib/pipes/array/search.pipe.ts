import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArraySearch',
  standalone: true,
  pure: true,
})
export class CxpArraySearchPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, query = '', key?: string): T[] {
    if (!value) return []; const term = query.trim().toLowerCase(); if (!term) return [...value]; return value.filter(item => { const candidate = key && item && typeof item === 'object' ? (item as Record<string, unknown>)[key] : item; return String(candidate ?? '').toLowerCase().includes(term); });
  }


}
