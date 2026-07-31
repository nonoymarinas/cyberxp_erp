import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
  standalone: true,
})
export class FullNamePipe implements PipeTransform {

  transform(
    firstName: string,
    middleName?: string,
    lastName?: string
  ): string {

    return [
      firstName,
      middleName,
      lastName,
    ]
      .filter(Boolean)
      .join(' ');
  }
}