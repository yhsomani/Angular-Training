import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child-component-5',
  standalone: true,
  template: `
    <div class="child-box">
      <h4>Child Component 5 (Two-Way)</h4>
      <button class="btn" (click)="increment()">Increment</button>
      <button class="btn" (click)="decrement()">Decrement</button>
      <p>Child's count is {{ count }}</p>
    </div>
  `,
  styles: [`
    .child-box { border-color: #17a2b8; }
    .btn { margin: 0 5px 5px 0; }
  `],
})
export class ChildComponent5 {
  @Input() count: number = 0;
  @Output() countChanged = new EventEmitter<number>();

  increment() {
    this.count++;
    this.countChanged.emit(this.count);
  }
  decrement() {
    this.count--;
    this.countChanged.emit(this.count);
  }
}
