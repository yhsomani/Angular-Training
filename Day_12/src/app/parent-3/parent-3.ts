import { Component } from '@angular/core';
import { ChildComponent3 } from '../child-3/child-3';

@Component({
  selector: 'app-parent-component-3',
  standalone: true,
  imports: [ChildComponent3],
  template: `
    <div class="parent-box" style="border-color: #ffc107;">
      <h3>ngOnChanges Hook</h3>
      <button class="btn" (click)="increment()">Increment</button>
      <button class="btn" (click)="decrement()">Decrement</button>
      <app-child-component-3 [count]="Counter"></app-child-component-3>
    </div>
  `,
  styles: [`
    .btn { margin: 0 5px 5px 0; }
  `],
})
export class ParentComponent3 {
  Counter = 5;
  increment() { this.Counter++; }
  decrement() { this.Counter--; }
}