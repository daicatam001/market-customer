import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstChar',
})
export class FirstCharPipe implements PipeTransform {
  transform(value: string | null, ...args: any[]): string {
    if (!value) {
      return '';
    }
    return value.charAt(0);
  }
}
