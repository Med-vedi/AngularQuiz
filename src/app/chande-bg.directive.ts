import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appChandeBg]',
})
export class ChandeBgDirective {
  @Input() isCorrect: Boolean = false;
  constructor(private ef: ElementRef, private render: Renderer2) {}

  @HostListener('click') answer() {
    const bgColor = this.isCorrect ? 'green' : 'red';
    this.render.setStyle(this.ef.nativeElement, 'background', bgColor);
    this.render.setStyle(
      this.ef.nativeElement,
      'border',
      `2px solid ${bgColor}`
    );
    this.render.setStyle(this.ef.nativeElement, 'color', '#fff');
    return;
  }
}
