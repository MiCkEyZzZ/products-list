import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'short' })
export class ShortPipe implements PipeTransform {
  transform(value: string, size: number) {
    return value.length >= size ? `${value.slice(0, size - 1)}...` : value;
  }
}
