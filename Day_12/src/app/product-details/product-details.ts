import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-rating">
      <strong>{{ _salesRating }}</strong>
      <button class="btn btn-small" (click)="onClick()">Get Details</button>
    </div>
  `,
  styles: [`
    .product-rating { display: flex; justify-content: space-between; align-items: center; }
    .btn-small { padding: 0.25rem 0.5rem; font-size: 0.8rem; }
  `]
})
export class ProductDetailsComponent
  implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  @Input() SalesRating: number = 3.5;
  @Output() GetLocalSales: EventEmitter<string> = new EventEmitter<string>();
  _salesRating: string = 'Default';

  constructor(private cdr: ChangeDetectorRef) {
    console.log('CHILD constructor called.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHILD 1. ngOnChanges called.');
    if (changes['SalesRating']) {
      const rating = changes['SalesRating'].currentValue;
      if (rating == 3.5) this._salesRating = 'Good';
      else if (rating == 4.0) this._salesRating = 'Very Good';
      else if (rating == 4.5) this._salesRating = 'Excellent';
      else this._salesRating = 'Undefined';
    }
  }

  ngOnInit(): void {
    console.log('CHILD 2. ngOnInit called.');
  }
  ngDoCheck(): void {
    console.log('CHILD 3. ngDoCheck called.');
  }
  ngAfterContentInit(): void {
    console.log('CHILD 4. ngAfterContentInit called.');
  }
  ngAfterContentChecked(): void {
    console.log('CHILD 5. ngAfterContentChecked called.');
  }
  ngAfterViewInit(): void {
    console.log('CHILD 6. ngAfterViewInit called.');
  }
  ngAfterViewChecked(): void {
    console.log('CHILD 7. ngAfterViewChecked called.');
  }
  ngOnDestroy(): void {
    console.log('CHILD 8. ngOnDestroy called.');
  }

  onClick(): void {
    this.GetLocalSales.emit(
      `Local sales report for this product: ${this._salesRating}`
    );
  }
}

