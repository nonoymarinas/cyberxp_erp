import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextTrim',
  standalone: true,
  pure: true,
})
export class CxpTextTrimPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return (value ?? '').trim();
  }


}
