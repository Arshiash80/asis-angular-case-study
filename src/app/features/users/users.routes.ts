import { type ResolveFn, type Routes } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './data-access/user.service';
import { catchError, map, of } from 'rxjs';

const userDetailTitleResolver: ResolveFn<string> = (route) => {
  const userService = inject(UserService);
  const userId = route.params['id'];

  return userService.getUser(userId).pipe(
    map(user => `ASIS Case Study | ${user.name} - User Detail`),
    catchError(() => of(`ASIS Case Study | User Detail ${userId}`))
  );
}

export const usersRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./pages/users-list/users-list.component').then(m => m.UsersComponent),
    title: 'ASIS Case Study | Users'
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./pages/user-detail/user-detail.component').then(m => m.UserDetailComponent),
    title: userDetailTitleResolver
  }
];
