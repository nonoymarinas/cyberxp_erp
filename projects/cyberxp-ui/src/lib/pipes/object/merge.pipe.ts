import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cxpObjectMerge', standalone: true, pure: true })
export class CxpObjectMergePipe implements PipeTransform {
  transform<T extends Record<string, unknown>>(value: T | null | undefined, source?: Partial<T> | null): T {
    return { ...(value ?? {}), ...(source ?? {}) } as T;
  }
}
