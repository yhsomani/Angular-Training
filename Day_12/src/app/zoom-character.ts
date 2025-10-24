import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appZoomCharacter]',
  standalone: true,
})
export class ZoomCharacter implements OnInit {
  @Input() zoomScale = 1.8;
  @Input() transition = '0.2s ease';

  private characters!: HTMLElement[];

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  private initialized = false;

  ngOnInit() {
    // Check if textContent is not null or empty
    if (!this.el.nativeElement.textContent?.trim() || this.initialized) {
      return;
    }

    this.initialized = true;
    const text = this.el.nativeElement.textContent;
    const fragment = this.renderer.createElement('div');

    // Create all spans in a document fragment for better performance
    const spans = Array.from(text).map((char) => {
      const span = this.renderer.createElement('span');
      this.renderer.addClass(span, 'zoom-char');
      this.renderer.setStyle(span, 'display', 'inline-block');
      this.renderer.setStyle(span, 'transition', `transform ${this.transition}`);
      this.renderer.setStyle(span, 'will-change', 'transform');

      if (char === ' ') {
        this.renderer.setStyle(span, 'width', '0.25em');
        span.innerHTML = '&nbsp;';
      } else {
        this.renderer.setProperty(span, 'textContent', char);
      }

      this.renderer.appendChild(fragment, span);
      return span;
    });

    // Clear and update DOM in one operation
    this.el.nativeElement.textContent = '';
    this.el.nativeElement.appendChild(fragment);
    this.characters = spans;
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('zoom-char')) {
      this.renderer.setStyle(target, 'transform', `scale(${this.zoomScale})`);
    }
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('zoom-char')) {
      this.renderer.setStyle(target, 'transform', 'scale(1)');
    }
  }
}
