/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NavComponent],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
  it(`should have a router-outlet`, () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy();
  });
  it(`should have a link to todos page`, () => {
    const routerLinks = fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref)
    );
    const index = routerLinks.findIndex(
      (debugElement) => debugElement.attributes['routerLink'] === '/todos'
    );
    expect(index).toBeGreaterThan(-1);
  });
  it('should test numbers', () => {
    let a = {};
    let b = {};
    expect(a).toEqual(b);
  });
});
