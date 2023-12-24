/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import { By } from '@angular/platform-browser';
import { Component, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  template: `
    <p highlight="cyan">First</p>
    <p highlight>Second</p>
  `,
})
class DirectiveHostComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<DirectiveHostComponent>;
  let component: DirectiveHostComponent;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [DirectiveHostComponent, HighlightDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectiveHostComponent);
    fixture.detectChanges();
    component = fixture.nativeElement;
  });
  it(`should set backgroundColor yellow when (@Input('highlight') bgColor) is NOT set )`, () => {
    const highlights = fixture.debugElement.queryAll(
      By.directive(HighlightDirective)
    );
    expect(highlights[1].nativeElement.style.backgroundColor).toBe('yellow');
  });
  it(`should set backgroundColor with given color when (@Input('highlight') bgColor) is set )`, () => {
    const elementsWithHighlightDirective = fixture.debugElement.queryAll(
      By.directive(HighlightDirective)
    );
    expect(
      elementsWithHighlightDirective[0].nativeElement.style.backgroundColor
    ).toBe('cyan');
  });
  it(`should change backgroundColor with given color when (@Input('highlight') bgColor) is changed )`, () => {
    const elementsWithHighlightDirective = fixture.debugElement.queryAll(
      By.directive(HighlightDirective)
    );
    const hightlightDirective =
      elementsWithHighlightDirective[0].injector.get(HighlightDirective);
    hightlightDirective.bgColor = 'red';

    const changes: SimpleChanges = {
      bgColor: new SimpleChange('cyan', 'red', true),
    };
    hightlightDirective.ngOnChanges(changes);
    expect(
      elementsWithHighlightDirective[0].nativeElement.style.backgroundColor
    ).toBe('red');
  });
});
