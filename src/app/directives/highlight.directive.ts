import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  defaultColor = 'black'; // lightgray
  @Input('appHighlight') bgColor = '';
  constructor(private el: ElementRef) {
    this.setColor();
  }
  setColor() {
    this.el.nativeElement.style.backgroundColor =
      this.bgColor || this.defaultColor;
  }
  ngOnChanges(changes:SimpleChanges) {
    this.setColor();
  }
}
