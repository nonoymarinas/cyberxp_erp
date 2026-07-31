import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextRemoveWhitespace',
  standalone: true,
  pure: true,
})
export class CxpTextRemoveWhitespacePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return (value ?? '').replace(/\s+/g, '');
  }


}
