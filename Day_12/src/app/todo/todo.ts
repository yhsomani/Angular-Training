import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ItemI } from '../item.interface';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../item/item';
import { ZoomCharacter } from '../zoom-character';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ItemComponent, ZoomCharacter],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class TodoComponent {
  componentTitle = 'My To Do List';
  filter = signal<'all' | 'active' | 'done'>('all');

  allItems = signal<ItemI[]>([
    { description: 'Learn Signals', done: true },
    { description: 'Build an App', done: false },
    { description: 'Deploy to Prod', done: false },
  ]);

  items = computed(() => {
    const filter = this.filter();
    const allItems = this.allItems();

    if (filter === 'all') {
      return allItems;
    }
    return allItems.filter((item) =>
      filter === 'done' ? item.done : !item.done
    );
  });

  addItem(description: string) {
    if (!description) return;

    this.allItems.update((prevItems) => [
      {
        description,
        done: false,
      },
      ...prevItems,
    ]);
  }

  remove(item: ItemI) {
    this.allItems.update((prevItems) =>
      prevItems.filter((i) => i !== item)
    );
  }
}
