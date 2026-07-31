import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpUrlQueryString',
  standalone: true,
  pure: true,
})
export class CxpUrlQueryStringPipe implements PipeTransform {
  transform(value: Record<string, unknown> | null | undefined): string {
    if (!value) return ''; const params = new URLSearchParams(); Object.entries(value).forEach(([key, item]) => { if (item == null) return; if (Array.isArray(item)) item.forEach(entry => params.append(key, String(entry))); else params.set(key, String(item)); }); return params.toString();
  }


}
