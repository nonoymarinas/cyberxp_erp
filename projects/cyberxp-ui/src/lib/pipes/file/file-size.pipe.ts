import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpFileFileSize',
  standalone: true,
  pure: true,
})
export class CxpFileFileSizePipe implements PipeTransform {
  transform(value: number | null | undefined, decimals = 2): string {
    if(value==null||!Number.isFinite(value)||value<0)return ''; if(value===0)return '0 B'; const units=['B','KB','MB','GB','TB']; const index=Math.min(Math.floor(Math.log(value)/Math.log(1024)),units.length-1); return `${(value/1024**index).toFixed(decimals)} ${units[index]}`;
  }


}
