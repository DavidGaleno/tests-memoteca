import { FormBuilder } from '@angular/forms';
import { TodoFormComponent } from './todo-form.component';
import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoFormModule } from './todo-form.module';
import { By } from '@angular/platform-browser';

describe('TodoFormComponent', () => {
  describe('Unit Tests', () => {
    let component: TodoFormComponent;

    beforeEach(() => {
      component = new TodoFormComponent(new FormBuilder());
    });

    it('should have a form attribute containing name and email controls', () => {
      expect(component.form.contains('name')).toBeTruthy();
      expect(component.form.contains('email')).toBeTruthy();
    });
    it('name control should be invalid when it has an empty value', () => {
      const control = component.form.get('name');
      control?.setValue('');
      expect(control?.errors?.['required']).toBeTruthy();
    });
    it('name control should be valid when it has a value', () => {
      const control = component.form.get('name');
      control?.setValue('teste');
      expect(control?.errors?.['required']).toBeFalsy();
    });
    describe(`#${TodoFormComponent.prototype.submit.name}`, () => {
      it('should be called when form is valid', () => {
        const submitSpy = spyOn(component, 'submit');
        const control = component.form.get('name');
        control?.setValue('teste');
        component.checkIfFormIsValid();
        expect(submitSpy).toHaveBeenCalled();
      });
      it('should NOT be called when form is invalid', () => {
        const submitSpy = spyOn(component, 'submit');
        const control = component.form.get('name');
        control?.setValue('');
        component.checkIfFormIsValid();
        expect(submitSpy).not.toHaveBeenCalled();
      });
    });
  });
  describe('Integration Tests', () => {
    let fixture: ComponentFixture<TodoFormComponent>;
    let component: TodoFormComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ToDoFormModule],
      }).compileComponents();
      fixture = TestBed.createComponent(TodoFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    describe(`#${TodoFormComponent.prototype.submit.name}`, () => {
      it(`(D) should NOT be called when name is empty`, () => {
        const submitSpy = spyOn(component, 'submit');
        const button: ElementRef<HTMLButtonElement> =
          fixture.debugElement.query(By.css('.submit-button'));
        button.nativeElement.click();
        expect(submitSpy).not.toHaveBeenCalled();
      });
      it(`(D) should be called when name is filled`, () => {
        const submitSpy = spyOn(component, 'submit');
        const button: ElementRef<HTMLButtonElement> =
          fixture.debugElement.query(By.css('.submit-button'));
        const nameField: ElementRef<HTMLInputElement> =
          fixture.debugElement.query(By.css('#name'));
        nameField.nativeElement.value = 'Teste';
        nameField.nativeElement.dispatchEvent(new Event('input'));
        button.nativeElement.click();
        expect(submitSpy).toHaveBeenCalled();
      });
    });
  });
});
