import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: [''],
    });
  }
  checkIfFormIsValid(): string | void {
    if (this.form.invalid) return 'Formulário invalido';
    return this.submit();
  }
  submit() {
    return console.log(this.form.controls);
  }
}
