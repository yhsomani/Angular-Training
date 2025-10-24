import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child-component-2',
  standalone: true,
  template: `
    <div class="child-box">
      <h4>Child Component 2</h4>
      <button class="btn" (click)="sendMessage()">Send Message to Parent</button>
    </div>
  `,
  styles: [`
    .child-box { border-color: #28a745; }
  `],
})
export class ChildComponent2 {
  childMessage: string = 'Hello from Child 2!';
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit(this.childMessage);
  }
}

