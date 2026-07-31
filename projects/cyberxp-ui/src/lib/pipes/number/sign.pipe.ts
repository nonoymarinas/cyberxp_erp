import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpNumberSign',
  standalone: true,
  pure: true,
})
export class CxpNumberSignPipe implements PipeTransform {
  transform(value: number | null | undefined): number | null {
    return value == null || !Number.isFinite(value) ? null : Math.sign(value);
  }


}
