import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpArrayChunk',
  standalone: true,
  pure: true,
})
export class CxpArrayChunkPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, size = 1): T[][] {
    if (!value || size <= 0) return []; const result: T[][] = []; for (let index = 0; index < value.length; index += size) result.push(value.slice(index, index + size)); return result;
  }


}
