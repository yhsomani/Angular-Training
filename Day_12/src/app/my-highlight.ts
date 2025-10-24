import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMyHighlight]',
  standalone: true,
})
export class MyHighlight {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Set initial styles once
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.2s ease');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.1)');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.0)');
  }
}
