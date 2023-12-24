import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let service: TodoService;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: TodoService,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TodoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should load todos from server`, () => {
    spyOn(service, 'getTodos').and.returnValue(of([1, 2, 3]));
    fixture.detectChanges();
    expect(component.todos.length).toBe(3);
  });
});
