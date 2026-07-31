import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayFirst',
  standalone: true,
  pure: true,
})
export class CxpArrayFirstPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined): T | null {
    return value?.[0] ?? null;
  }


}
