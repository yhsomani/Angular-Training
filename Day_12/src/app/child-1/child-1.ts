import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-component-1',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="child-box">
      <h4>Child Component 1</h4>
      <p>Message from Parent: <strong>{{ childMessage }}</strong></p>
      <p>Another Message: <strong>{{ childMessage2 }}</strong></p>
      <p>Friend List:</p>
      <ul>
        @for (friend of childfriendList; track $index) {
        <li>{{ friend }}</li>
        }
      </ul>
    </div>
  `,
  styles: [`
    h4 { margin-top: 0; }
  `],
})
export class ChildComponent1 {
  @Input() childMessage: string = '';
  @Input() childMessage2: string = '';
  @Input() childfriendList: string[] = [];
}