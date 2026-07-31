import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpColorLuminance',
  standalone: true,
  pure: true,
})
export class CxpColorLuminancePipe implements PipeTransform {
  transform(value: string | null | undefined): number | null {
    const rgb=this.parse(value); if(!rgb) return null; const channels=[rgb.r,rgb.g,rgb.b].map(c=>{const s=c/255; return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4;}); return 0.2126*channels[0]+0.7152*channels[1]+0.0722*channels[2];
  }


private parse(value: string | null | undefined): { r:number; g:number; b:number } | null {
  const hex=(value ?? '').replace('#','').trim(); const normalized=hex.length===3?hex.split('').map(c=>c+c).join(''):hex;
  if(!/^[0-9a-fA-F]{6}$/.test(normalized)) return null;
  return {r:parseInt(normalized.slice(0,2),16),g:parseInt(normalized.slice(2,4),16),b:parseInt(normalized.slice(4,6),16)};
}

}
