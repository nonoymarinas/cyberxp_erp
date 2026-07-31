import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpNumberBytes',
  standalone: true,
  pure: true,
})
export class CxpNumberBytesPipe implements PipeTransform {
  transform(value: number | null | undefined, decimals = 2): string {
    return this.format(value, decimals);
  }


private format(value: number | null | undefined, decimals: number): string {
  if (value == null || !Number.isFinite(value) || value < 0) return '';
  if (value === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const index = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  return `${(value / 1024 ** index).toFixed(Math.max(0, decimals))} ${units[index]}`;
}

}
