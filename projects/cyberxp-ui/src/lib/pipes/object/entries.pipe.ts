import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cxpObjectEntries', standalone: true, pure: true })
export class CxpObjectEntriesPipe implements PipeTransform {
  transform<T>(value: Record<string, T> | null | undefined): Array<[string, T]> {
    return value ? Object.entries(value) : [];
  }
}
