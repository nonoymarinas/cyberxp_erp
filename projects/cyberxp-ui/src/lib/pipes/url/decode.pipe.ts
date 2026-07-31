import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpUrlDecode',
  standalone: true,
  pure: true,
})
export class CxpUrlDecodePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    try { return decodeURIComponent(value ?? ''); } catch { return value ?? ''; }
  }


}
