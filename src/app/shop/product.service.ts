import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, retry, delay } from 'rxjs/operators';

import { Product } from '../shared/interfaces/product';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService,
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public getProducts(page: number, limit: number): Observable<Product[]> {
    return this.http
      .get<Product[]>(
        this.url + '/products' + '?_page=' + page + '&_limit=' + limit,
      )
      .pipe(
        delay(300),
        tap(() => {
          this.notificationService.addSuccess('Продукты успешно загрузились.');
        }),
        catchError(err => {
          this.notificationService.addError('Протзошла ошибка на сервере.');

          return throwError(() => err);
        }),
      );
  }

  public getProduct(id: number) {
    return this.http
      .get<Product>(this.url + '/products/' + id)
      .pipe(delay(300));
  }

  public updateProduct(id: number, product: Product) {
    return this.http
      .put<Product>(
        this.url + '/products/' + id,
        JSON.stringify(product),
        this.httpOptions,
      )
      .pipe(
        retry(1),
        tap(() => {
          this.notificationService.addSuccess(
            'Информация продукта была изменена.',
          );
        }),
        catchError(err => {
          this.notificationService.addError('Что-то пошло не так.');

          return throwError(() => err);
        }),
        delay(300),
      );
  }
}
