import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpNumberCeil',
  standalone: true,
  pure: true,
})
export class CxpNumberCeilPipe implements PipeTransform {
  transform(value: number | null | undefined): number | null {
    return value == null || !Number.isFinite(value) ? null : Math.ceil(value);
  }


}
