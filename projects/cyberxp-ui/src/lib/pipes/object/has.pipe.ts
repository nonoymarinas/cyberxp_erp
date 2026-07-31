import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpObjectHas',
  standalone: true,
  pure: true,
})
export class CxpObjectHasPipe implements PipeTransform {
  transform(value: Record<string, unknown> | null | undefined, key: string): boolean {
    return !!value && Object.prototype.hasOwnProperty.call(value, key);
  }


}
