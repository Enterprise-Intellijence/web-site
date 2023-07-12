import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) return "";

    value = value.toLowerCase().replaceAll("_", " ").split(" ").map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
    return value;

  }
}
