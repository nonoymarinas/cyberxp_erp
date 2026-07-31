import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpNumberFloor',
  standalone: true,
  pure: true,
})
export class CxpNumberFloorPipe implements PipeTransform {
  transform(value: number | null | undefined): number | null {
    return value == null || !Number.isFinite(value) ? null : Math.floor(value);
  }


}
