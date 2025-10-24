import { Component } from '@angular/core';
import { ChildComponent2 } from '../child-2/child-2';

@Component({
  selector: 'app-parent-component-2',
  standalone: true,
  imports: [ChildComponent2],
  template: `
    <div class="parent-box" style="border-color: #28a745;">
      <h3>Child to Parent (@Output)</h3>
      <p>Message from child: <strong>{{ parentMessage }}</strong></p>
      <app-child-component-2
        (messageEvent)="receiveMessage($event)"
      ></app-child-component-2>
    </div>
  `,
})
export class ParentComponent2 {
  parentMessage: string = '---Waiting for message---';
  receiveMessage(message: string) {
    this.parentMessage = message;
  }
}