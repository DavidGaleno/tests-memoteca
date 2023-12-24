import { AppRoutingModule } from '../app-routing.module';
import { routes } from './app.routes';
import { UsersComponent } from './users/users.component';

describe(AppRoutingModule.name, () => {
  it('should contain a route for /users', () => {
    expect(routes).toContain({
      path: 'users',
      component: UsersComponent,
    });
  });
});
