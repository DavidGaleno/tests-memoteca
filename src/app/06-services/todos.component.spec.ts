import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EMPTY, of, throwError } from 'rxjs';
import { TodosModule } from './todos.module';

describe(TodosComponent.name, () => {
  let service: TodoService;
  let fixture: ComponentFixture<TodosComponent>;
  let component: TodosComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TodosModule],
    }).compileComponents();
    fixture = TestBed.createComponent(TodosComponent);
    service = TestBed.inject(TodoService);
    component = fixture.componentInstance;
  });

  it(`#${TodosComponent.prototype.ngOnInit.name} should fill the todos attribute with items returned from the server`, () => {
    const wantedResponse = [[1, 2, 3]];
    spyOn(service, 'getTodos').and.returnValue(of(wantedResponse));
    fixture.detectChanges();
    expect(component.todos).toBe(wantedResponse);
  });
  it(`#${TodosComponent.prototype.add.name} should be called`, () => {
    const addSpy = spyOn(service, 'add').and.returnValue(of({ title: '... ' }));
    component.add();
    expect(addSpy).toHaveBeenCalled();
  });
  it(`#${TodosComponent.prototype.add.name} should add a new item to todos attribute`, () => {
    component.todos = [];
    spyOn(service, 'add').and.returnValue(of({ title: '... ' }));
    component.add();
    expect(TodosComponent.length).toBeGreaterThan(0);
  });
  it(`should set an error message when the server returns an error`, () => {
    fixture.detectChanges();
    const message = 'teste';
    spyOn(service, 'add').and.returnValue(throwError(() => message));
    component.add();
    fixture.detectChanges();
    console.log(typeof component.message);
    expect(component.message).toBe(message);
  });
  it('should call the server to delete a todo if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteSpy = spyOn(service, 'delete').and.returnValue(EMPTY);
    component.delete(1);
    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
  it('should NOT call the server to delete a todo if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const deleteSpy = spyOn(service, 'delete').and.returnValue(EMPTY);
    component.delete(1);
    expect(deleteSpy).not.toHaveBeenCalled();
  });
});
