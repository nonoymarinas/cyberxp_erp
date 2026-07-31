import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cxpObjectValues', standalone: true, pure: true })
export class CxpObjectValuesPipe implements PipeTransform {
  transform<T>(value: Record<string, T> | null | undefined): T[] {
    return value ? Object.values(value) : [];
  }
}
