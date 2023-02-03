import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CurrencyPipe } from './pipes/currency.pipe';
import { ShortPipe } from './pipes/short.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { InputComponent } from './input/input.component';
import { SearchFilterPipe } from './pipes/search.pipe';
import { FocusDirective } from './directives/focus.directive';

@NgModule({
  declarations: [
    CurrencyPipe,
    ShortPipe,
    SearchFilterPipe,
    PaginationComponent,
    ProductCardComponent,
    SpinnerComponent,
    ProductsListComponent,
    InputComponent,
    FocusDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  exports: [
    CurrencyPipe,
    ShortPipe,
    SearchFilterPipe,
    PaginationComponent,
    ProductCardComponent,
    SpinnerComponent,
    ProductsListComponent,
    InputComponent,
  ],
})
export class SharedModule {}
