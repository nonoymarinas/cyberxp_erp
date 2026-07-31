import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cxpObjectOmit', standalone: true, pure: true })
export class CxpObjectOmitPipe implements PipeTransform {
  transform<T>(value: Record<string, T> | null | undefined, keys: readonly string[]): Record<string, T> {
    if (!value) return {};
    const excluded = new Set(keys);
    return Object.fromEntries(Object.entries(value).filter(([key]) => !excluded.has(key))) as Record<string, T>;
  }
}
