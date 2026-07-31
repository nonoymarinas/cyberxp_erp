import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextInitials',
  standalone: true,
  pure: true,
})
export class CxpTextInitialsPipe implements PipeTransform {
  transform(value: string | null | undefined, maxParts = 2): string {
    return (value ?? '').trim().split(/\s+/).filter(Boolean).slice(0, maxParts).map(part => part.charAt(0).toUpperCase()).join('');
  }


}
