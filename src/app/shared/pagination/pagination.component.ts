import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() current = 0;
  @Input() totalPages = 0;

  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  public pages: number[] = [];

  ngOnChanges(): void {
    this.pages = this.getPages(this.totalPages);
  }

  public onChangePage(page: number): void {
    this.changePage.emit(page);
  }

  public onNext(): void {
    this.next.emit(this.current);
  }

  public onPrevious(): void {
    this.previous.emit(this.current);
  }

  private getPages(endPage: number): number[] {
    return Array.from(Array(Math.ceil(endPage + 1) - 1).keys()).map(i => ++i);
  }
}
