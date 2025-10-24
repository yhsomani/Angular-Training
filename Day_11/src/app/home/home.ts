import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../shared/card/card';
import { TEAM_DATA } from '../data/team.data';
import { Employee, Item } from '../interfaces/data.interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `


    <div class="card-grid">
      <!-- @if / @else Demo -->
      <app-card>
        <h2 class="text-2xl font-bold mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="icon-small" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m4 0h-1v4h-1M12 20h.01M12 4v4m0 0L8 8m4 0 4 0"/></svg>&#64;if / &#64;else Demo</h2>
        <button (click)="changeStatus()" class="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 mb-4">
          Toggle Content ({{ status() ? 'ON' : 'OFF' }})
        </button>
        
        @if (status()) {
          <div class="space-y-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-md">
            <h3 class="text-lg font-medium text-green-800 dark:text-green-200">Content is Visible</h3>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name:
                <input [value]="firstname()" (input)="firstname.set($event.target.value)" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white">
              </label>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name:
                <input [value]="lastname()" (input)="lastname.set($event.target.value)" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white">
              </label>
            </div>
          </div>
        } @else {
          <div class="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-md">
            <h3 class="text-lg font-medium text-red-800 dark:text-red-200">Content is Hidden</h3>
          </div>
        }
        <p class="mt-4 text-xl">Hello, <span class="font-semibold text-indigo-600 dark:text-indigo-400">{{ firstname() }} {{ lastname() }}</span></p>
      </app-card>

      <!-- @for / @empty Demo -->
      <app-card>
        <h2 class="text-2xl font-bold mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="icon-small" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v2H3V3zm2 6h14v2H5V9zm-2 6h18v2H3v-2z"/></svg>&#64;for / &#64;empty Demo</h2>
        <ul class="list-disc list-inside p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md">
          @for (item of items(); track item.id) {
            <li class="text-gray-800 dark:text-gray-200">ID: {{ item.id }}, Name: {{ item.name }}</li>
          } @empty {
            <li class="text-gray-500 dark:text-gray-400 italic">No Data</li>
          }
        </ul>
      </app-card>

      <!-- @switch Demo -->
      <app-card>
        <h2 class="text-2xl font-bold mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="icon-small" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3M3 11h18M4 21h16a1 1 0 001-1v-7H3v7a1 1 0 001 1z"/></svg>&#64;switch Demo</h2>
        <div class="flex space-x-2 mb-4">
          <button (click)="myValue.set('option1')" class="px-3 py-1 rounded-md text-sm font-medium" [class]="myValue() === 'option1' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'">Option 1</button>
          <button (click)="myValue.set('option2')" class="px-3 py-1 rounded-md text-sm font-medium" [class]="myValue() === 'option2' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'">Option 2</button>
          <button (click)="myValue.set('other')" class="px-3 py-1 rounded-md text-sm font-medium" [class]="myValue() !== 'option1' && myValue() !== 'option2' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'">Other</button>
        </div>
        <div class="p-4 border rounded-md bg-gray-50 dark:bg-gray-700/50 min-h-[5rem]">
          @switch (myValue()) {
            @case ('option1') {
              <div class="text-green-700 dark:text-green-300 font-semibold">Content for option 1</div>
            }
            @case ('option2') {
              <div class="text-yellow-700 dark:text-yellow-300 font-semibold">Content for option 2</div>
            }
            @default {
              <div class="text-gray-500 dark:text-gray-400 italic">Default content when no case matches</div>
            }
          }
        </div>
      </app-card>

      <!-- @for with Table Demo -->
      <app-card>
        <h2 class="text-2xl font-bold mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="icon-small" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v2H3V5zm0 4h18v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/></svg>&#64;for Table Demo (Employee Data)</h2>
        <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table class="w-full min-w-max text-left text-sm">
            <thead class="bg-gray-100 dark:bg-gray-700">
              <tr class="text-gray-700 dark:text-gray-300 uppercase">
                <th class="px-4 py-3 font-medium">Id</th>
                <th class="px-4 py-3 font-medium">Name</th>
                <th class="px-4 py-3 font-medium">Age</th>
                <th class="px-4 py-3 font-medium">Department</th>
                <th class="px-4 py-3 font-medium">Salary</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              @for (emp of emps(); track emp.id) {
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td class="px-4 py-3">{{ emp.id }}</td>
                  <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ emp.name }}</td>
                  <td class="px-4 py-3">{{ emp.age }}</td>
                  <td class="px-4 py-3">{{ emp.department }}</td>
                  <td class="px-4 py-3">{{ emp.salary.toLocaleString() }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </app-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  // --- Signals for state ---
  firstname = signal('');
  lastname = signal('');
  status = signal(true);
  myValue = signal('option2');

  // --- Computed signal (derived state) ---
  lbl = computed(() => !this.status());

  // --- Static data ---
  items = signal<Item[]>([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Mango' },
  ]);
  emps = signal<Employee[]>(TEAM_DATA);

  // --- Methods ---
  changeStatus() {
    this.status.update(current => !current);
  }
}

