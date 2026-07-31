import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextInitialsAvatar',
  standalone: true,
  pure: true,
})
export class CxpTextInitialsAvatarPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return (value ?? '').trim().split(/\s+/).filter(Boolean).slice(0, 2).map(part => part.charAt(0).toUpperCase()).join('');
  }


}
