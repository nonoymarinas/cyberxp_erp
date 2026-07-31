import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextTruncate',
  standalone: true,
  pure: true,
})
export class CxpTextTruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, length = 50, suffix = '…'): string {
    const text = value ?? ''; if (length < 0 || text.length <= length) return text; return text.slice(0, Math.max(0, length - suffix.length)).trimEnd() + suffix;
  }


}
