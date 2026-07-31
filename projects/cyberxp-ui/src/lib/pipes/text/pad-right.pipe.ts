import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextPadRight',
  standalone: true,
  pure: true,
})
export class CxpTextPadRightPipe implements PipeTransform {
  transform(value: string | number | null | undefined, length: number, fill = ' '): string {
    return String(value ?? '').padEnd(Math.max(0, length), fill);
  }


}
