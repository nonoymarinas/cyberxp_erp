import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpNumberRound',
  standalone: true,
  pure: true,
})
export class CxpNumberRoundPipe implements PipeTransform {
  transform(value: number | null | undefined, decimals = 0): number | null {
    if (value == null || !Number.isFinite(value)) return null; const factor = 10 ** decimals; return Math.round((value + Number.EPSILON) * factor) / factor;
  }


}
