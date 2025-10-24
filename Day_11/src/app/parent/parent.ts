import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChildComponent } from '../child/child';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <div class="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Parent Component</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">This component holds the data and passes it down to the child component below.</p>
      
      <!-- Pass signal values to the child component inputs -->
      <app-child 
        [childMessage]="parentMessage()" 
        [childMessage2]="parentMessage1()" 
        [childfriendList]="friendlist()" 
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentComponent {
  // Use signals for component state
  parentMessage = signal("= message from parent");
  parentMessage1 = signal("new msg");
  friendlist = signal(["name 1", "name 2", "name 3", "name 4", "name 5", "name 6", "name 7", "name 8", "name 9", "name 10"]);
}
