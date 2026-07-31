import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextMask',
  standalone: true,
  pure: true,
})
export class CxpTextMaskPipe implements PipeTransform {
  transform(value: string | null | undefined, visibleCharacters = 4, maskCharacter = '•'): string {
    const text = value ?? ''; const visible = Math.max(0, visibleCharacters); return text.length <= visible ? text : maskCharacter.repeat(text.length - visible) + text.slice(-visible);
  }


}
