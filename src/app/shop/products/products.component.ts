import { Component, OnInit } from '@angular/core';

import { Product } from '../../shared/interfaces/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public title = 'Список продуктов';

  public products: Product[];

  public current = 1;
  public pages: number[];
  public total = '24';
  public totalItems: number = parseInt(this.total);
  public limit = 6;
  public totalPages: number = Math.ceil(this.totalItems / this.limit);
  public endPage: number = this.totalPages;
  public loading: boolean;
  public query: string;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService
      .getProducts(this.current, this.limit)
      .subscribe(response => {
        this.products = response!;
        this.loading = false;
      });
  }

  public onSearchProduct(text: string) {
    this.query = text;
  }

  public onChangePage(page: number): void {
    this.current = page;
    this.loadProducts();
  }

  public onNext(page: number): void {
    this.current = page + 1;
    this.loadProducts();
  }

  public onPrevious(page: number): void {
    this.current = page - 1;
    this.loadProducts();
  }
}
