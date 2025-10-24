import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustomDirective]',
  standalone: true,
})
export class appCustomDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.border = '2px solid red';
    this.el.nativeElement.style.padding = '0.25rem';
  }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    // Allow only letters and spaces
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
  }
}