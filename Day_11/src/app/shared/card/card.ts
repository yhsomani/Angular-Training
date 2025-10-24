import { Component } from '@angular/core';

@Component({
    selector: 'app-card',
    standalone: true,
    template: `
    <div class="card p-6">
      <ng-content></ng-content>
    </div>
  `,
    styles: [
        `:host { display: block }
     `,
    ],
})
export class CardComponent { }
