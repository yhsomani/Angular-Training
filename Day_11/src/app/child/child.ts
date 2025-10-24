import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <div class="border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-inner">
      <h3 class="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4">Child Component</h3>
      <p class="text-gray-700 dark:text-gray-300">Message 1: <span class="font-medium text-black dark:text-white">{{ childMessage() }}</span></p>
      <p class="text-gray-700 dark:text-gray-300">Message 2: <span class="font-medium text-black dark:text-white">{{ childMessage2() }}</span></p>
      
      <h4 class="text-lg font-semibold mt-6 mb-2 text-blue-700 dark:text-blue-400">Friend List (from Parent):</h4>
      <ul class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
        @for (friend of childfriendList(); track $index) {
          <li>{{ friend }}</li>
        }
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  // Use the new `input()` function for inputs (modern Angular)
  childMessage = input<string>('');
  childMessage2 = input<string>('');
  childfriendList = input<string[]>([]);
}