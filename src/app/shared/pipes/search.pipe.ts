import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../interfaces/product';

@Pipe({
  name: 'productFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(products: Product[], text: string): Product[] {
    if (!products) return [];
    if (!text) return products;

    return products.filter((product: Product) =>
      product.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
    );
  }
}
