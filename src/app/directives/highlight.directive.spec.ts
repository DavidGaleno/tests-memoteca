import {
  Component,
  ElementRef,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `<button class="highlight-botao" appHighlight="red"></button
    ><button class="botao" appHighlight></button>`,
})
class TestComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, HighlightDirective],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });
  it('should create an instance', () => {
    const button: ElementRef<HTMLButtonElement> = fixture.debugElement.query(
      By.css('.botao')
    );
    const directive = new HighlightDirective(button);
    expect(directive).toBeTruthy();
  });
  it(`${TestComponent.name} should have 2 buttons with an attatched highlightDirective`, () => {
    const buttons = fixture.debugElement.queryAll(
      By.directive(HighlightDirective)
    );
    expect(buttons.length).toBe(2);
  });
  describe('Button without (@Input bgColor)', () => {
    it(`${TestComponent.name} button backgroundColor with class .botao should be black when a (@Input bgColor) is not set`, () => {
      const button: HTMLButtonElement =
        fixture.nativeElement.querySelector('.botao');
      expect(button.style.backgroundColor).toBe('black');
    });
    it(`${TestComponent.name} button backgroundColor with class .botao should be blue when a (@Input bgColor) is set to blue`, () => {
      const buttonRef = fixture.debugElement.query(By.css('.botao'));
      const directive = buttonRef.injector.get(HighlightDirective);
      directive.bgColor = 'blue';
      const changes: SimpleChanges = {
        bgColor: new SimpleChange('', 'blue', true),
      };
      directive.ngOnChanges(changes);
      const button: HTMLButtonElement =
        fixture.nativeElement.querySelector('.botao');
      expect(button.style.backgroundColor).toBe('blue');
    });
  });
  describe('Button with (@Input bgColor)', () => {
    it(`${TestComponent.name} button backgroundColor with class .highlight-botao should be red when a (@Input bgColor) is set to red`, () => {
      const button: HTMLButtonElement =
        fixture.nativeElement.querySelector('.highlight-botao');
      expect(button.style.backgroundColor).toBe('red');
    });
    it(`${TestComponent.name} button backgroundColor with class .highlight-botao should be yellow when a (@Input bgColor) is changed to yellow`, () => {
      const buttonRef = fixture.debugElement.query(By.css('.highlight-botao'));
      const directive: HighlightDirective =
        buttonRef.injector.get(HighlightDirective);
      directive.bgColor = 'yellow';
      const change: SimpleChanges = {
        bgColor: new SimpleChange('red', 'yellow', true),
      };
      directive.ngOnChanges(change);
      const button: HTMLButtonElement = buttonRef.nativeElement;
      expect(button.style.backgroundColor).toBe('yellow');
    });
  });
});
