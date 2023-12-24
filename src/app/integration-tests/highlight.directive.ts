import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective implements OnChanges {
  defaultColor = 'yellow';
  @Input('highlight') bgColor: string = '';

  constructor(private el: ElementRef) {
    this.setColor();
  }

  ngOnChanges() {
    this.setColor();
  }
  setColor() {
    this.el.nativeElement.style.backgroundColor =
      this.bgColor || this.defaultColor;
  }
}
