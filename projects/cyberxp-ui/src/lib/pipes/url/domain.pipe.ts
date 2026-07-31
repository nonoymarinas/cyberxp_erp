import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpUrlDomain',
  standalone: true,
  pure: true,
})
export class CxpUrlDomainPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    try { const host = new URL(value ?? '').hostname.replace(/^www\./, ''); const parts = host.split('.'); return parts.length > 2 ? parts.slice(-2).join('.') : host; } catch { return ''; }
  }


}
