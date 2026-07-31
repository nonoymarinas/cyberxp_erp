import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpUrlHostname',
  standalone: true,
  pure: true,
})
export class CxpUrlHostnamePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    try { return new URL(value ?? '').hostname; } catch { return ''; }
  }


}
