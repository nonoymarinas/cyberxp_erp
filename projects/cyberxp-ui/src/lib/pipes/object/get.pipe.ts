import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpObjectGet',
  standalone: true,
  pure: true,
})
export class CxpObjectGetPipe implements PipeTransform {
  transform(value: unknown, path: string, defaultValue: unknown = null): unknown {
    if (!path) return value; const result = path.split('.').reduce<unknown>((current, key) => current && typeof current === 'object' ? (current as Record<string, unknown>)[key] : undefined, value); return result ?? defaultValue;
  }


}
