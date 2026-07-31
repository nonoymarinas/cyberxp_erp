import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextEllipsis',
  standalone: true,
  pure: true,
})
export class CxpTextEllipsisPipe implements PipeTransform {
  transform(value: string | null | undefined, length = 50): string {
    const text = value ?? ''; return text.length > length ? text.slice(0, Math.max(0, length - 1)).trimEnd() + '…' : text;
  }


}
