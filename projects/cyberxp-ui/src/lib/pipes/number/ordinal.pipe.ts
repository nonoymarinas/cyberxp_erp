import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpNumberOrdinal',
  standalone: true,
  pure: true,
})
export class CxpNumberOrdinalPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null || !Number.isFinite(value)) return ''; const integer = Math.trunc(value); const mod100 = Math.abs(integer) % 100; const suffix = mod100 >= 11 && mod100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[Math.abs(integer) % 10] ?? 'th'; return `${integer}${suffix}`;
  }


}
