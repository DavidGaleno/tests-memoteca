import { Component } from '@angular/core';
import { ReservePipePipe } from './reserve-pipe.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({ template: `<p class="text">{{ 'teste' | reservePipe }}</p>` })
class TestComponent {}

describe('ReservePipePipe', () => {
  let pipe: ReservePipePipe;
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, ReservePipePipe],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    pipe = new ReservePipePipe();
    fixture.detectChanges();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should reverse word', () => {
    const palavra = 'teste';
    const resultadoExperado = palavra.split('').reverse().join('');
    const resultado = pipe.transform('teste');
    expect(resultado).toBe(resultadoExperado);
  });
  it(`(D) ${TestComponent.name} should have it text reversed when rendered`, () => {
    const text: HTMLParagraphElement =
      fixture.nativeElement.querySelector('.text');
    expect(text.innerText).toBe('etset');
  });
});
