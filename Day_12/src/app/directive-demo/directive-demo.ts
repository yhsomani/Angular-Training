import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyHighlight } from '../my-highlight';
import { appCustomDirective } from '../custom-directive';
import { ZoomCharacter } from '../zoom-character';

@Component({
  selector: 'app-directive-part-1',
  standalone: true,
  imports: [CommonModule, FormsModule, MyHighlight, appCustomDirective, ZoomCharacter],
  templateUrl: './directive-demo.html',
  styleUrl: './directive-demo.css'
})
export class DirectivePart1Component {
  isSuccess: boolean = false;
  username: string = 'Angular Developer';

  onRadioChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isSuccess = input.value === 'true';
  }
}