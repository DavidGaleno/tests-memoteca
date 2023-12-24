import { BehaviorSubject } from 'rxjs';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app.routes';

const paramsSubject = new BehaviorSubject({});

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject.asObservable(),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should navigate to 'users' when button is pressed`, () => {
    const routerSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.navigator');
    button.click();
    expect(routerSpy).toHaveBeenCalledWith(['users']);
  });
  it(`should navigate to '/notfound' when an invalid user id is passed`, () => {
    const routerSpy = spyOn(router, 'navigate');
    paramsSubject.next({ id: 0 });
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalledWith(['not-found']);
  });
});
