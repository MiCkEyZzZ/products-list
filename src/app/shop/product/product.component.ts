import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../shared/interfaces/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public id: number;
  public product: Product;
  public loading: boolean;

  constructor(
    public router: ActivatedRoute,
    public productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];

    if (this.id) {
      this.loading = true;
      this.productService.getProduct(this.id).subscribe(product => {
        this.product = product;
        this.loading = false;
      });
    }
  }
}
