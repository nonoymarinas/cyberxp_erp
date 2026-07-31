import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cxpObjectClone', standalone: true, pure: true })
export class CxpObjectClonePipe implements PipeTransform {
  transform<T>(value: T): T {
    if (typeof structuredClone === 'function') return structuredClone(value);
    return JSON.parse(JSON.stringify(value)) as T;
  }
}
