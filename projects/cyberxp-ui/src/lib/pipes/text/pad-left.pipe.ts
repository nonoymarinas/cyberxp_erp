import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextPadLeft',
  standalone: true,
  pure: true,
})
export class CxpTextPadLeftPipe implements PipeTransform {
  transform(value: string | number | null | undefined, length: number, fill = ' '): string {
    return String(value ?? '').padStart(Math.max(0, length), fill);
  }


}
