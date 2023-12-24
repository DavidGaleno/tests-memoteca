import { NgModule } from '@angular/core';
import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [TodosComponent],
  providers: [
    {
      provide: TodoService,
    },
  ],
})
export class TodosModule {}
