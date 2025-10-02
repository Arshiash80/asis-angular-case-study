import { Routes } from '@angular/router';
import { homeRoutes } from './features/home/home.routes';
import { errorsRoutes } from './features/errors/errors.routes';
import { usersRoutes } from './features/users/users.routes';


export const routes: Routes = [
  ...homeRoutes,
  ...usersRoutes,
  ...errorsRoutes
];
