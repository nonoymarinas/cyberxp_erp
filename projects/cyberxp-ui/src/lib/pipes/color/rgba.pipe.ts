import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
      name: 'cxpColorRgba',
      standalone: true,
      pure: true,
    })
    export class CxpColorRgbaPipe implements PipeTransform {
      transform(value: string | null | undefined, alpha = 1): string {
        const rgb = this.parse(value); return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.max(0, Math.min(1, alpha))})` : '';
      }


private parse(value: string | null | undefined): { r:number; g:number; b:number } | null {
  const hex=(value ?? '').replace('#','').trim(); const normalized=hex.length===3?hex.split('').map(c=>c+c).join(''):hex;
  if(!/^[0-9a-fA-F]{6}$/.test(normalized)) return null;
  return {r:parseInt(normalized.slice(0,2),16),g:parseInt(normalized.slice(2,4),16),b:parseInt(normalized.slice(4,6),16)};
}

    }
