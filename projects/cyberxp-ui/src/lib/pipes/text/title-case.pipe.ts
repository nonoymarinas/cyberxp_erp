import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextTitleCase',
  standalone: true,
  pure: true,
})
export class CxpTextTitleCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return (value ?? '').toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  }


}
