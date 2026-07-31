import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpColorRgbToHex',
  standalone: true,
  pure: true,
})
export class CxpColorRgbToHexPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    const match = (value ?? '').match(/(\d+)\D+(\d+)\D+(\d+)/); if (!match) return ''; const parts = match.slice(1,4).map(part => Math.max(0, Math.min(255, Number(part))).toString(16).padStart(2,'0')); return `#${parts.join('').toUpperCase()}`;
  }


}
