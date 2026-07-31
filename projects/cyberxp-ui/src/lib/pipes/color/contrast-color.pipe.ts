import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpColorContrastColor',
  standalone: true,
  pure: true,
})
export class CxpColorContrastColorPipe implements PipeTransform {
  transform(value: string | null | undefined, light = '#FFFFFF', dark = '#000000', threshold = 0.5): string {
    const rgb=this.parse(value); if(!rgb) return light; const luminance=(0.299*rgb.r+0.587*rgb.g+0.114*rgb.b)/255; return luminance>threshold?dark:light;
  }


private parse(value: string | null | undefined): { r:number; g:number; b:number } | null {
  const hex=(value ?? '').replace('#','').trim(); const normalized=hex.length===3?hex.split('').map(c=>c+c).join(''):hex;
  if(!/^[0-9a-fA-F]{6}$/.test(normalized)) return null;
  return {r:parseInt(normalized.slice(0,2),16),g:parseInt(normalized.slice(2,4),16),b:parseInt(normalized.slice(4,6),16)};
}

}
