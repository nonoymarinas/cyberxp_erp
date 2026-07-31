import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpColorOpacity',
  standalone: true,
  pure: true,
})
export class CxpColorOpacityPipe implements PipeTransform {
  transform(value: string | null | undefined, opacity = 1): string {
    const hex=(value ?? '').replace('#','').trim(); const normalized=hex.length===3?hex.split('').map(c=>c+c).join(''):hex; if(!/^[0-9a-fA-F]{6}$/.test(normalized)) return ''; const alpha=Math.round(Math.max(0,Math.min(1,opacity))*255).toString(16).padStart(2,'0').toUpperCase(); return `#${normalized.toUpperCase()}${alpha}`;
  }


}
