import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective implements OnChanges {
  defaultColor = 'yellow';
  @Input('highlight') bgColor: string = '';

  constructor(private el: ElementRef) {
    this.setColor();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setColor();
  }
  setColor() {
    this.el.nativeElement.style.backgroundColor =
      this.bgColor || this.defaultColor;
  }
}
