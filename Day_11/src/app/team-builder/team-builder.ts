import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../shared/avatar/avatar';
import { CardComponent } from '../shared/card/card';
import { TEAM_DATA } from '../data/team.data';
import { INFO_CARDS_DATA } from '../data/info-cards.data';
import { Employee } from '../interfaces/data.interfaces';


@Component({
  selector: 'app-team-builder',
  standalone: true,
  imports: [CommonModule, AvatarComponent, CardComponent],
  template: `
    <!-- Custom Error Message (Replaces alert()) -->
    @if (showError()) {
      <div class="fixed top-5 right-5 bg-red-600 text-white p-4 rounded-lg shadow-xl z-50">
        <span class="font-bold">Error:</span> {{ errorMessage() }}
      </div>
    }

    <!-- Static Info Cards -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-4">TypeScript Naming Conventions</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        @for (card of cards(); track card.heading) {
          <app-card>
            <h3 class="text-lg font-semibold mb-2">{{ card.heading }}</h3>
            <p class="text-secondary">{{ card.data }}</p>
          </app-card>
        }
      </div>
    </div>

    <!-- Team Builder App -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Build Your Team (Budget: $100,000)</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Player List -->
        <app-card>
          <h3 class="text-xl font-semibold mb-4">List of Players</h3>
          <div class="space-y-3 max-h-96 overflow-y-auto pr-2">
            @for (player of players(); track player.id) {
              <label for="player-{{player.id}}" class="player-label">
                  <div class="flex items-center gap-3">
                  <app-avatar [name]="player.name"></app-avatar>
                  <div>
                    <div class="font-medium">{{ player.name }}</div>
                    <div class="text-sm text-secondary">{{ player.department }} • <span class="font-semibold">{{ '$' + player.salary.toLocaleString() }}</span></div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  id="player-{{player.id}}" 
                  name="{{player.id}}" 
                  (change)="onPlayerToggle(player, $event)"
                  class="player-checkbox"
                />
              </label>
            }
          </div>
        </app-card>

        <!-- My Team & Total -->
        <app-card>
          <h3 class="text-xl font-semibold mb-4">My Team</h3>
          <ul class="list-disc list-inside space-y-2 mb-6">
            @for (p of myTeam(); track p.id) {
              <li>{{ p.name }}</li>
            } @empty {
              <li class="text-secondary italic">Select players to add them to your team.</li>
            }
          </ul>
          
          <hr class="my-6 border-border-color">
          
          <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;">
            <div class="text-2xl font-bold">
              Total Cost: 
              <span [class]="totalCost() > 100000 ? 'budget-badge over' : 'budget-badge'">{{ '$' + totalCost().toLocaleString() }}</span>
              <span class="text-sm text-secondary">/ $100,000</span>
            </div>
            <div class="text-sm text-secondary">Selected: {{ myTeam().length }}</div>
          </div>
          <div class="mt-4">
            <div class="progress-track">
              <div class="progress-fill" [style.width.%]="(totalCost() / 100000) * 100"></div>
            </div>
            <div class="text-sm text-secondary mt-2">{{ (totalCost() / 100000) * 100 | number:'1.0-0' }}% of budget used</div>
          </div>
        </app-card>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 2rem;
    }
    .player-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem;
      border-radius: 0.5rem;
      background-color: var(--card-bg);
      border: 1px solid var(--border-color);
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .player-label:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    }
    .player-checkbox {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 0.25rem;
      border-color: var(--border-color);
      accent-color: var(--primary);
    }
    .progress-track {
      background-color: var(--border-color);
      height: 0.75rem;
      border-radius: 9999px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background-color: var(--primary);
      border-radius: 9999px;
      transition: width 0.3s ease-in-out;
    }
    .budget-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-weight: 600;
      background-color: var(--primary-light);
      color: var(--primary);
    }
    .budget-badge.over {
      background-color: #fee2e2;
      color: #ef4444;
    }
    .text-secondary {
      color: var(--text-secondary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamBuilderComponent {
  // --- Static Data ---
  cards = signal(INFO_CARDS_DATA);
  players = signal<Employee[]>(TEAM_DATA);

  // --- State Signals ---
  myTeam = signal<Employee[]>([]);
  totalCost = signal(0);
  showError = signal(false);
  errorMessage = signal('');

  // --- Methods ---
  onPlayerToggle(player: Employee, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      const newPrice = this.totalCost() + player.salary;
      if (newPrice <= 100000) {
        // Budget OK: Add player and update totalCost
        this.totalCost.set(newPrice);
        this.myTeam.update(currentTeam => [...currentTeam, player]);
      } else {
        // Budget Exceeded: Show error, uncheck box, do not update state
        this.showErrorModal("Budget exceeded! Cannot add player.");
        (event.target as HTMLInputElement).checked = false;
      }
    } else {
      // Player is being removed
      this.totalCost.update(currentPrice => currentPrice - player.salary);
      this.myTeam.update(currentTeam => currentTeam.filter(p => p.id !== player.id));
    }
  }

  // Helper method to show and hide the error message
  showErrorModal(message: string) {
    this.errorMessage.set(message);
    this.showError.set(true);

    // Hide the error after 3 seconds
    setTimeout(() => {
      this.showError.set(false);
    }, 3000);
  }
}