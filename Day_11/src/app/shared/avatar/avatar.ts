import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-avatar',
    standalone: true,
    template: `
    <div class="avatar" [title]="name">
      {{ initials }}
    </div>
  `,
    styles: [
        `:host { display: inline-block }
     .avatar { width:40px; height:40px; border-radius:9999px; display:inline-flex; align-items:center; justify-content:center; background:linear-gradient(135deg, rgba(99,102,241,0.12), rgba(79,70,229,0.06)); color:var(--accent); font-weight:700 }
    `,
    ],
})
export class AvatarComponent {
    @Input() name = '';

    get initials() {
        const parts = (this.name || '').split(' ').filter(Boolean);
        const a = parts[0]?.charAt(0) || '';
        const b = parts[1]?.charAt(0) || '';
        return (a + b).toUpperCase();
    }
}
