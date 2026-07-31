import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpColorDarken',
  standalone: true,
  pure: true,
})
export class CxpColorDarkenPipe implements PipeTransform {
  transform(value: string | null | undefined, percent = 10): string {
    return this.adjust(value, -1 * Math.abs(percent));
  }


private adjust(value: string | null | undefined, percent: number): string {
  const hex=(value ?? '').replace('#','').trim();
  const normalized=hex.length===3?hex.split('').map(c=>c+c).join(''):hex;
  if(!/^[0-9a-fA-F]{6}$/.test(normalized)) return '';
  const amount=255*(percent/100);
  const parts=[0,2,4].map(i=>Math.max(0,Math.min(255,Math.round(parseInt(normalized.slice(i,i+2),16)+amount))).toString(16).padStart(2,'0'));
  return `#${parts.join('').toUpperCase()}`;
}

}
