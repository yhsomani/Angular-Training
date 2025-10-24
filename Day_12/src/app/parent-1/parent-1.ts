import { Component } from '@angular/core';
import { ChildComponent1 } from '../child-1/child-1';

@Component({
  selector: 'app-parent-component-1',
  standalone: true,
  imports: [ChildComponent1],
  template: `
    <div class="parent-box" style="border-color: #007bff;">
      <h3>Parent to Child (@Input)</h3>
      <app-child-component-1
        [childMessage]="parentMessage"
        [childMessage2]="parentMessage1"
        [childfriendList]="friendlist"
      >
      </app-child-component-1>
    </div>
  `,
})
export class ParentComponent1 {
  parentMessage = '= message from parent';
  parentMessage1 = 'new msg';
  friendlist: string[] = ['Alice', 'Bob', 'Charlie'];
}