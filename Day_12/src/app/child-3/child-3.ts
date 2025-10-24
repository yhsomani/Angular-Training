import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child-component-3',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="child-box">
      <h4>Child Component 3 (OnChanges)</h4>
      <p>Current count is <strong>{{ count }}</strong></p>
      <p>Change Log:</p>
      <ul>
        @for (log of changeLog; track $index) {
        <li>{{ log }}</li>
        }
      </ul>
    </div>
  `,
  styles: [`
    .child-box { border-color: #ffc107; }
  `],
})
export class ChildComponent3 implements OnChanges {
  @Input() count: number = 0;
  changeLog: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['count']) {
      const { previousValue, currentValue, firstChange } = changes['count'];
      this.changeLog.push(
        `Count changed. Prev: ${previousValue}, Current: ${currentValue}, First: ${firstChange}`
      );
    }
  }
}
