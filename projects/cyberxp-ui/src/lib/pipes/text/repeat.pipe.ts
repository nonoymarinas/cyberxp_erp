import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextRepeat',
  standalone: true,
  pure: true,
})
export class CxpTextRepeatPipe implements PipeTransform {
  transform(value: string | null | undefined, count = 1): string {
    return (value ?? '').repeat(Math.max(0, count));
  }


}
