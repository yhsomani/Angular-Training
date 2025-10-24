import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { HomeComponent } from './home/home';
import { TeamBuilderComponent } from './team-builder/team-builder';
import { ParentComponent } from './parent/parent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    TeamBuilderComponent,
    ParentComponent,
  ],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 sm:p-8">
      <div class="max-w-7xl mx-auto">
        
        <div class="site-hero card p-6 mb-6">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
            <div style="display:flex;gap:1rem;align-items:center;">
              <div style="width:48px;height:48px;border-radius:10px;background:#4f8cff;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:18px;">NG</div>
              <div>
                <div class="brand-title" style="font-size:1.3rem;font-weight:600;">Angular Demo App</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:1rem;">
              <nav class="nav-pills" aria-label="Main navigation">
                @for (view of views; track view.id) {
                  <button
                    (click)="currentView.set(view.id)"
                    [class]="currentView() === view.id ? 'nav-pill nav-pill--active' : 'nav-pill'"
                  >
                    {{ view.name }}
                  </button>
                }
              </nav>
              <button class="btn btn--ghost" (click)="toggleDarkMode()">Toggle Theme</button>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons (moved into hero nav pills) -->

        <!-- Main Content Area -->
        <main>
          @switch (currentView()) {
            @case ('home') {
              <app-home />
            }
            @case ('team') {
              <app-team-builder />
            }
            @case ('parent-child') {
              <app-parent />
            }
          }
        </main>
      </div>
    </div>
  `,
  styles: [
    `
    /* Adding a few global styles for dark mode and base font */
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    /* Simple dark mode preference */
    .dark {
      color-scheme: dark;
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // --- State for Navigation ---
  currentView = signal<'home' | 'team' | 'parent-child'>('home');

  views: { id: 'home' | 'team' | 'parent-child'; name: string }[] = [
    { id: 'home', name: 'Feature Demos' },
    { id: 'team', name: 'Team Builder' },
    { id: 'parent-child', name: 'Parent/Child Demo' }
  ];

  constructor() {
    // Set dark mode based on user's system preference or saved preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}

