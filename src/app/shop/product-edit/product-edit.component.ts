import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay, Observable } from 'rxjs';

import { Product } from '../../shared/interfaces/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  public id: number;
  public loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(1)]),
    });

    if (this.id) {
      this.loading = true;
      this.productService.getProduct(this.id).subscribe(data => {
        this.productForm.patchValue(data);
        this.loading = false;
      });
    }
  }

  public onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.saveProduct().subscribe({
      next: () => this.router.navigate(['/products/' + this.id]),
      error: error => {
        console.error(error);
      },
    });
  }

  private saveProduct(): Observable<Product> {
    this.loading = true;
    return this.productService
      .updateProduct(this.id!, this.productForm.value)
      .pipe(delay(300));
  }
}
