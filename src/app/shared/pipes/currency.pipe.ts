import { Pipe, PipeTransform } from '@angular/core';

const formatter = new Intl.NumberFormat('ru-RU', {
  currency: 'RUB',
  style: 'currency',
  minimumFractionDigits: 0,
});

@Pipe({ name: 'currency' })
export class CurrencyPipe implements PipeTransform {
  transform(value: number) {
    return formatter.format(value);
  }
}
