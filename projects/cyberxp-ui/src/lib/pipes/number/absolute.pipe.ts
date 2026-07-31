import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpNumberAbsolute',
  standalone: true,
  pure: true,
})
export class CxpNumberAbsolutePipe implements PipeTransform {
  transform(value: number | null | undefined): number | null {
    return value == null || !Number.isFinite(value) ? null : Math.abs(value);
  }


}
