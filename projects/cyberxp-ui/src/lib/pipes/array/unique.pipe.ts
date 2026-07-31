import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayUnique',
  standalone: true,
  pure: true,
})
export class CxpArrayUniquePipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined): T[] {
    return value ? [...new Set(value)] : [];
  }


}
