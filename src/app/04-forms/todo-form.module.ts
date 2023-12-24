import { NgModule } from '@angular/core';
import { TodoFormComponent } from './todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoFormComponent],
  imports: [ReactiveFormsModule],
})
export class ToDoFormModule {}
