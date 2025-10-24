import { Component } from '@angular/core';
import { ChildComponent5 } from '../child-4/child-4';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parent-component-5',
  standalone: true,
  imports: [ChildComponent5, FormsModule],
  template: `
    <div class="parent-box" style="border-color: #17a2b8;">
      <h3>Two-Way Binding</h3>
      <p>Parent's count is <strong>{{ Counter }}</strong></p>
      <label>Edit parent count: </label>
      <input type="number" [(ngModel)]="Counter" class="sm-text-input" style="width: auto; display: inline-block; margin: 0;"/>
      <app-child-component-5
        [count]="Counter"
        (countChanged)="countChangedHandler($event)"
      >
      </app-child-component-5>
    </div>
  `,
})
export class ParentComponent5 {
  Counter = 5;
  countChangedHandler(count: number) {
    this.Counter = count;
  }
}