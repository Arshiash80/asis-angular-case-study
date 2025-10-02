import { type ResolveFn, type Routes } from '@angular/router';

const userDetailTitleResolver: ResolveFn<string> = async (route) => {
  return `User Detail ${route.params['id']}`;
}

export const usersRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./pages/users-list/users-list.component').then(m => m.UsersComponent),
    title: 'Users'
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./pages/user-detail/user-detail.component').then(m => m.UserDetailComponent),
    title: userDetailTitleResolver
  }
];
