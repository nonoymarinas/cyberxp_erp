import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cxpObjectPick', standalone: true, pure: true })
export class CxpObjectPickPipe implements PipeTransform {
  transform<T>(value: Record<string, T> | null | undefined, keys: readonly string[]): Record<string, T> {
    if (!value) return {};
    return keys.reduce<Record<string, T>>((result, key) => {
      if (Object.prototype.hasOwnProperty.call(value, key)) result[key] = value[key];
      return result;
    }, {});
  }
}
