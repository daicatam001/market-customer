import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstChar',
})
export class FirstCharPipe implements PipeTransform {
  transform(value: string | null, ...args: string[]): string {
    if (!value) {
      return '';
    }
    args.forEach((arg) => {
      const reg = new RegExp(arg, 'gi');
      console.log(reg);
      value = value!.replace(reg, '');
    });
    return value.trim().charAt(0);
  }
}


@NgModule({
  imports: [],
  exports: [FirstCharPipe],
  declarations: [FirstCharPipe],
  providers: [],
})
export class FirstCharModule {}
