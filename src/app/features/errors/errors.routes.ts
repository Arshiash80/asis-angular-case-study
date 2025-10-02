import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const errorsRoutes: Routes = [
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found'
  }
];
