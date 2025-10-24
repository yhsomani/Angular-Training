import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ItemI } from '../item.interface';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.html',
  styleUrl: './item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  editable = signal(false);

  @Input({ required: true }) item!: ItemI;
  @Output() remove = new EventEmitter<void>();

  saveItem(description: string) {
    if (!description) return;

    this.editable.set(false);
    this.item.description = description;
  }
}
